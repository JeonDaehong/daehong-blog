import type { BlogPost } from "@/lib/types"

export const meta: Omit<BlogPost, "id"> = {
  title: "📘 Apache Gravitino 안정성을 높이는 작은 개선 3가지 기여 회고",
  excerpt: "Apache Gravitino 프로젝트에 기여한 3가지 개선 사항들을 통해 안정성을 높인 경험을 공유합니다.",
  author: {
    name: "전대홍",
    image: "/profile.jpg",
  },
  publishedAt: "2025-08-22",
  tags: ["OpenSource PR", "Gravitino"],
  category: "오픈소스기여",
  views: 0,
  likes: 0,
  featured: true,
  thumbnail: "/apache-gravitino-stability-improvements.png",
  bookmark: true,
}

const content = `
# ✏️ 1. 서론

올해 5월, 저는 **Apache Iceberg** 프로젝트에 기여를 시작했습니다. **JUnit4에서 JUnit5로의 마이그레이션 과정에서 Minicluster 의존성을 제거하는 핵심적인 부분을 수정**하였고, 이어서 Flink 환경에서의 Table Maintenance 문서를 추가하는 작업에도 참여했습니다. 다만 문서의 경우 수정해야 할 부분이 많아 아직 정식으로 기여가 완료되지는 않았고, 지금도 계속 이어서 작업을 진행하고 있는 중입니다.

그러던 중 제가 운영진(멘토)으로 활동하고 있는 **오픈소스 기여 커뮤니티에서 9기 멘토링이 시작**되었습니다. 저는 회사에서 평소 열심히 하던 후배를 한 명 초대하여 함께 기여를 도왔고, 그 과정에서 후배가 **Apache Gravitino** 라는 프로젝트를 발견하게 되었습니다. 이후 해당 이슈를 함께 해결하다 보니 저 역시 **Apache Gravitino** 에 기여를 하게 되었습니다. 현재까지 총 3건의 기여를 완료하였으며, 추가로 1건의 기여를 진행하고 있는 중입니다.

이번 글에서는 제가 **Apache Gravitino에 기여한 3가지 내용을 중심**으로 회고를 작성하고자 합니다.

참고로 함께 참여한 후배 역시 **Gravitino** 의 컨트리뷰터가 되었는데, 이에 대한 과정과 경험은 별도의 회고록에서 더 자세히 다룰 예정입니다.

<br>
<div align="center">◈</div>
<br>

# ✏️ 2. 본론

이번 기여에서 중점으로 삼은 부분은 아래의 3가지였습니다.

1. Apache Gravitino 가 무엇인지를 공부할 것
2. 후배(멘티)의 기여를 적극적으로 도울 수 있을 것
3. 너무 Core 하지 않더라도, 안정성을 높일 수 있는 작은 기여를 여러개 해보는 것

<br>

## 1️⃣ 첫번째 기여: PartitionOperations.java 잘못된 요청 차단하기

<div className="my-8">
  <img src="/images/gravitino-issue-discussion.png" alt="Apache Iceberg PR 머지 완료" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

첫 번째 이슈는 \`PartitionOperations.java\`에서 발생했습니다. 문제는 \`addPartitions\` 메서드에서 \`request.validate()\` 호출이 빠져 있다는 점이었습니다.

기존 코드는 사용자가 잘못된 입력을 보내도 서버가 아무 문제 없이 진행하는 구조였습니다. 예를 들어, null이나 비어 있는 파티션 요청이 들어오면 그대로 넘어가 버려, 이후 로직에서 예상치 못한 오류가 발생할 수 있었습니다.

아래는 기존 코드입니다.

\`\`\`java
@POST
  @Produces("application/vnd.gravitino.v1+json")
  @Timed(name = "add-partitions." + MetricNames.HTTP_PROCESS_DURATION, absolute = true)
  @ResponseMetered(name = "add-partitions", absolute = true)
  public Response addPartitions(
      @PathParam("metalake") String metalake,
      @PathParam("catalog") String catalog,
      @PathParam("schema") String schema,
      @PathParam("table") String table,
      AddPartitionsRequest request) {
    LOG.info(
        "Received add {} partition(s) request for table {}.{}.{}.{} ",
        request.getPartitions().length,
        metalake,
        catalog,
        schema,
        table);
    Preconditions.checkArgument(
        request.getPartitions().length == 1, "Only one partition is supported");

    try {
      // ...
    }
  }
\`\`\`

제가 적용한 개선은 단순하지만 핵심적입니다. \`addPartitions\` 메서드에 \`request.validate()\` 호출을 추가하여, 잘못된 요청은 즉시 **BAD_REQUEST** 응답을 반환하도록 한 것이죠.

아래는 제가 추가한 코드입니다.

\`\`\`java
@POST
  @Produces("application/vnd.gravitino.v1+json")
  @Timed(name = "add-partitions." + MetricNames.HTTP_PROCESS_DURATION, absolute = true)
  @ResponseMetered(name = "add-partitions", absolute = true)
  public Response addPartitions(
      @PathParam("metalake") String metalake,
      @PathParam("catalog") String catalog,
      @PathParam("schema") String schema,
      @PathParam("table") String table,
      AddPartitionsRequest request) {
    LOG.info(
        "Received add {} partition(s) request for table {}.{}.{}.{} ",
        request.getPartitions().length,
        metalake,
        catalog,
        schema,
        table);
    Preconditions.checkArgument(
        request.getPartitions().length == 1, "Only one partition is supported");

    request.validate(); // 추가

    try {
      // ...
    }
  }
\`\`\`

로컬과 CI 환경에서 확인한 결과, invalid 요청이 제대로 차단되는 것을 눈으로 확인할 수 있었습니다.

한 줄의 validate 호출이지만, 실제 서비스 안정성에 큰 차이를 만들 수 있다는 것을 체감했습니다.

그리고 그 PR 을 올리고, Merge 를 요청한 결과, Maintainer 의 승인을 받고, 병합에 성공하였습니다.

<div className="my-8">
  <img src="/images/gravitino-pr-8082.png" alt="Apache Iceberg PR 머지 완료" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

<br>

## 2️⃣ 두 번째: CreateFileset.java: NPE 방지와 기본값 적용

<div className="my-8">
  <img src="/images/gravitino-createfileset-issue.png" alt="Apache Iceberg PR 머지 완료" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

두 번째 이슈는 \`CreateFileset.java\` 에서 발생한 **NPE** 문제입니다.

원래 코드는 \`properties.get("managed").equals("true")\`를 바로 호출하고 있었는데, managed 프로퍼티가 없으면 바로 **NullPointerException**이 발생합니다. 운영 환경에서는 이런 예외 하나로 전체 파일셋 생성이 실패할 수 있어, 치명적일 수 있는 상황이었습니다.

기존 코드는 다음과 같았습니다.

\`\`\`java
import java.util.Map;
import org.apache.gravitino.NameIdentifier;
import org.apache.gravitino.cli.CommandContext;
import org.apache.gravitino.cli.ErrorMessages;

@Override
  public void handle() {
    NameIdentifier name = NameIdentifier.of(schema, fileset);
    boolean managed = "true".equals(properties.get("managed"));
    Map<String, String> storageLocations = MapUtils.getPrefixMap(properties, "location-", true);
    Map<String, String> propertiesWithoutLocation =
        MapUtils.getMapWithoutPrefix(properties, "location-");
    // ...
  }
\`\`\`

제가 적용한 개선은 두 가지입니다.

1. null-safe 처리: 프로퍼티가 없어도 안전하게 확인
2. 기본값 적용: managed 프로퍼티가 없는 경우, Fileset.Type.EXTERNAL로 기본 설정

그래서 아래와 같이 코드를 변경하였습니다. ( Optional import 도 추가 )

\`\`\`java
import java.util.Map;
import java.util.Optional; // import 추가
import org.apache.gravitino.NameIdentifier;
import org.apache.gravitino.cli.CommandContext;
import org.apache.gravitino.cli.ErrorMessages;

public CreateFileset(
  @Override
  public void handle() {
    NameIdentifier name = NameIdentifier.of(schema, fileset);
    boolean managed =
        Optional.ofNullable(properties.get("managed")).map("true"::equals).orElse(false); // 변경
    Map<String, String> storageLocations = MapUtils.getPrefixMap(properties, "location-", true);
    Map<String, String> propertiesWithoutLocation =
        MapUtils.getMapWithoutPrefix(properties, "location-");
    // ...
  }
\`\`\`

결과적으로, 이제 누락된 managed 속성으로 인한 예외 없이 파일셋 생성이 가능하게 되었습니다.

이 때는, 직접 테스트 코드도 꼼꼼하게 작성하였습니다.

\`\`\`java
@Test
void testCreateFilesetCommandWithManagedProperty() {
  CreateFileset mockCreate = mock(CreateFileset.class);
  when(mockCommandLine.hasOption(GravitinoOptions.METALAKE)).thenReturn(true);
  when(mockCommandLine.getOptionValue(GravitinoOptions.METALAKE)).thenReturn("metalake_demo");
  when(mockCommandLine.hasOption(GravitinoOptions.NAME)).thenReturn(true);
  when(mockCommandLine.getOptionValue(GravitinoOptions.NAME))
      .thenReturn("catalog.schema.fileset");
  when(mockCommandLine.hasOption(GravitinoOptions.COMMENT)).thenReturn(true);
  when(mockCommandLine.getOptionValue(GravitinoOptions.COMMENT)).thenReturn("comment");
  when(mockCommandLine.hasOption(GravitinoOptions.PROPERTIES)).thenReturn(true);
  when(mockCommandLine.getOptionValues(GravitinoOptions.PROPERTIES))
      .thenReturn(new String[] {"managed=true", "key2=value2"});

  GravitinoCommandLine commandLine =
      spy(
          new GravitinoCommandLine(
              mockCommandLine, mockOptions, CommandEntities.FILESET, CommandActions.CREATE));
  doReturn(mockCreate)
      .when(commandLine)
      .newCreateFileset(
          any(CommandContext.class),
          eq("metalake_demo"),
          eq("catalog"),
          eq("schema"),
          eq("fileset"),
          eq("comment"),
          any());
  doReturn(mockCreate).when(mockCreate).validate();
  commandLine.handleCommandLine();
  verify(mockCreate).handle();
}

@Test
void testCreateFilesetWithMissingManagedPropertyNPE() {
  Main.useExit = false;
  CommandContext mockContext = mock(CommandContext.class);
  when(mockContext.url()).thenReturn(GravitinoCommandLine.DEFAULT_URL);

  Map<String, String> propertiesWithoutManaged = new java.util.HashMap<>();
  propertiesWithoutManaged.put("key1", "value1");
  propertiesWithoutManaged.put("key2", "value2");

  CreateFileset spyCreateFileset =
      spy(
          new CreateFileset(
              mockContext,
              "metalake_demo",
              "catalog",
              "schema",
              "fileset",
              "comment",
              propertiesWithoutManaged));

  assertThrows(RuntimeException.class, spyCreateFileset::validate);
  verify(spyCreateFileset, never()).handle();
  String errOutput = new String(errContent.toByteArray(), StandardCharsets.UTF_8).trim();
  assertEquals("Missing property 'managed'", errOutput);
}

@Test
void testCreateFilesetWithNullPropertiesNPE() {
  Main.useExit = false;
  CommandContext mockContext = mock(CommandContext.class);
  when(mockContext.url()).thenReturn(GravitinoCommandLine.DEFAULT_URL);

  CreateFileset spyCreateFileset =
      spy(
          new CreateFileset(
              mockContext, "metalake_demo", "catalog", "schema", "fileset", "comment", null));

  assertThrows(RuntimeException.class, spyCreateFileset::validate);
  verify(spyCreateFileset, never()).handle();
}

@Test
void testCreateFilesetWithEmptyPropertiesNPE() {
  Main.useExit = false;
  CommandContext mockContext = mock(CommandContext.class);
  when(mockContext.url()).thenReturn(GravitinoCommandLine.DEFAULT_URL);

  Map<String, String> emptyProperties = new java.util.HashMap<>();

  CreateFileset spyCreateFileset =
      spy(
          new CreateFileset(
              mockContext,
              "metalake_demo",
              "catalog",
              "schema",
              "fileset",
              "comment",
              emptyProperties));

  assertThrows(RuntimeException.class, spyCreateFileset::validate);
  verify(spyCreateFileset, never()).handle();
  String errOutput = new String(errContent.toByteArray(), StandardCharsets.UTF_8).trim();
  assertEquals("Missing property 'managed'", errOutput);
}

@Test
void testCreateFilesetWithManagedTrueProperty() {
  Main.useExit = false;
  CommandContext mockContext = mock(CommandContext.class);
  when(mockContext.url()).thenReturn(GravitinoCommandLine.DEFAULT_URL);

  Map<String, String> propertiesWithManagedTrue = new java.util.HashMap<>();
  propertiesWithManagedTrue.put("managed", "true");
  propertiesWithManagedTrue.put("key1", "value1");

  CreateFileset spyCreateFileset =
      spy(
          new CreateFileset(
              mockContext,
              "metalake_demo",
              "catalog",
              "schema",
              "fileset",
              "comment",
              propertiesWithManagedTrue));

  // Should not throw exception when managed property is present
  Assertions.assertDoesNotThrow(spyCreateFileset::validate);
}

@Test
void testCreateFilesetWithManagedFalseProperty() {
  Main.useExit = false;
  CommandContext mockContext = mock(CommandContext.class);
  when(mockContext.url()).thenReturn(GravitinoCommandLine.DEFAULT_URL);

  Map<String, String> propertiesWithManagedFalse = new java.util.HashMap<>();
  propertiesWithManagedFalse.put("managed", "false");
  propertiesWithManagedFalse.put("key1", "value1");

  CreateFileset spyCreateFileset =
      spy(
          new CreateFileset(
              mockContext,
              "metalake_demo",
              "catalog",
              "schema",
              "fileset",
              "comment",
              propertiesWithManagedFalse));

  // Should not throw exception when managed property is present
  Assertions.assertDoesNotThrow(spyCreateFileset::validate);
}
\`\`\`

올바른 테스트 코드를 작성하는 경험은, 스스로를 더 단단하게 만드는 경험이 되기도 하였습니다. :D

그리고, 다시 PR 을 올렸고, Gravitino 의 두 번째 Merge 에 성공하게 되었습니다.

<div className="my-8">
  <img src="/images/gravitino-pr-8083.png" alt="Apache Iceberg PR 머지 완료" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

작은 변경이지만, 실제 사용자가 마주칠 수 있는 문제를 사전에 예방할 수 있다는 점에서 의미 있는 기여였습니다.
또한 후배와 함께 리뷰를 주고받으면서 null-safe 처리와 기본값 적용의 중요성을 다시 한번 체감할 수 있었습니다. 단순한 코드 수정 이상의 학습이 되는 경험이었습니다.

<br>

## 3️⃣ 세 번째: EntityCombinedFileset.java: hiddenProperties 초기화로 NPE 방지

<div className="my-8">
  <img src="/images/gravitino-npe-issue.png" alt="Apache Iceberg PR 머지 완료" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

세 번째 이슈는 \`EntityCombinedFileset.java\` 에서 발생한 **NPE** 문제입니다.

\`\`\`java
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Collections; // import 추가
public final class EntityCombinedFileset implements Fileset {

  private final FilesetEntity filesetEntity;
  private Set<String> hiddenProperties;

  // ...

	public EntityCombinedFileset withHiddenProperties(Set<String> hiddenProperties) {
    this.hiddenProperties = hiddenProperties;
    return this;
  }
\`\`\`

위 코드를 보면, 문제의 원인은 properties() 메서드가 hiddenProperties.contains()를 바로 호출한다는 점이었습니다.

만약 hiddenProperties가 초기화되지 않았다면, 바로 NullPointerException이 발생합니다.

그래서 아래와 같이 수정을 하였습니다.

\`\`\`java
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
public final class EntityCombinedFileset implements Fileset {

  private final FilesetEntity filesetEntity;
  private Set<String> hiddenProperties = Collections.emptySet(); // 초기화

  // ...

	public EntityCombinedFileset withHiddenProperties(Set<String> hiddenProperties) {
    this.hiddenProperties = hiddenProperties != null ? hiddenProperties : Collections.emptySet(); // NPE 방지
    return this;
  }
\`\`\`

제가 적용한 수정은 다음과 같습니다.
1. hiddenProperties 초기화: 객체 생성 시 항상 빈 Set으로 초기화
2. withHiddenProperties() null-safe 처리: null 입력에도 안전하게 처리

그리고 그에 따른 추가 테스트코드도 작성하였습니다.

\`\`\`java
/**
  * Test that properties() method works correctly when hiddenProperties is not initialized. This
  * test verifies the fix for NPE issue #8168.
  */
@Test
void testPropertiesWithoutHiddenProperties() {
  Fileset fileset = Mockito.mock(Fileset.class);
  ImmutableMap<String, String> properties = ImmutableMap.of("propA", "valueA", "propB", "valueB");
  Mockito.when(fileset.properties()).thenReturn(properties);

  EntityCombinedFileset entityCombinedFileset = EntityCombinedFileset.of(fileset);

  // This should not throw NPE and should return all properties
  Assertions.assertEquals(properties, entityCombinedFileset.properties());
}

/** Test that properties() method correctly filters hidden properties. */
@Test
void testPropertiesWithHiddenProperties() {
  Fileset fileset = Mockito.mock(Fileset.class);
  ImmutableMap<String, String> properties =
      ImmutableMap.of("propA", "valueA", "propB", "valueB", "hiddenProp", "hiddenValue");
  Mockito.when(fileset.properties()).thenReturn(properties);

  EntityCombinedFileset entityCombinedFileset =
      EntityCombinedFileset.of(fileset).withHiddenProperties(ImmutableSet.of("hiddenProp"));

  Map<String, String> result = entityCombinedFileset.properties();

  // Should only contain non-hidden properties
  Assertions.assertEquals(2, result.size());
  Assertions.assertEquals("valueA", result.get("propA"));
  Assertions.assertEquals("valueB", result.get("propB"));
  Assertions.assertNull(result.get("hiddenProp"));
}

/** Test that withHiddenProperties() method handles null input correctly. */
@Test
void testWithHiddenPropertiesNull() {
  Fileset fileset = Mockito.mock(Fileset.class);
  ImmutableMap<String, String> properties = ImmutableMap.of("propA", "valueA", "propB", "valueB");
  Mockito.when(fileset.properties()).thenReturn(properties);

  EntityCombinedFileset entityCombinedFileset =
      EntityCombinedFileset.of(fileset).withHiddenProperties(null);

  // Should not throw NPE and should return all properties
  Assertions.assertEquals(properties, entityCombinedFileset.properties());
}

/** Test that properties() method handles null values correctly in the property map. */
@Test
void testPropertiesWithNullValues() {
  Fileset fileset = Mockito.mock(Fileset.class);
  Map<String, String> propertiesWithNull =
      ImmutableMap.<String, String>builder()
          .put("propA", "valueA")
          .put("propB", "valueB")
          .build();

  // Mock a map that includes null key/value (though ImmutableMap doesn't allow nulls,
  // this simulates what might happen with other Map implementations)
  Map<String, String> mockProperties = Mockito.mock(Map.class);
  Mockito.when(mockProperties.entrySet()).thenReturn(propertiesWithNull.entrySet());
  Mockito.when(fileset.properties()).thenReturn(mockProperties);

  EntityCombinedFileset entityCombinedFileset = EntityCombinedFileset.of(fileset);

  Map<String, String> result = entityCombinedFileset.properties();

  // Should contain all valid properties (no null keys/values)
  Assertions.assertEquals(2, result.size());
  Assertions.assertEquals("valueA", result.get("propA"));
  Assertions.assertEquals("valueB", result.get("propB"));
}
\`\`\`

테스트까지 꼼꼼하게 작성하였습니다.
null 입력 처리, properties() 호출, 필터링 로직 모두 검증하여, 안정성을 확실히 보장했습니다.

이후 local 에서 빌드를 성공시킨 후, PR 을 전송하였습니다.

그리고 그 결과 세번째 Merge 에도 성공을 하였습니다.

<div className="my-8">
  <img src="/images/gravitino-pr-8168.png" alt="머지 완료" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

결과적으로, \`hiddenProperties\` 를 명시적으로 설정하지 않아도 안전하게 \`properties()\` 를 호출할 수 있으며, 기존 기능도 그대로 유지되게 되었습니다.

<br>

## 4️⃣ 작은 안정성 개선의 의미

처음에는 “별거 아닌 수정”처럼 보일 수 있지만, 실제 운영 환경에서는 이런 작은 개선이 서비스 신뢰성을 좌우합니다.

또한, 후배와 함께 작업하며 리뷰와 토론을 통한 학습 경험도 컸습니다. 멘티가 처음 접하는 코드베이스를 이해하고 PR을 작성하는 과정에서, 제가 코드를 설명하고 개선 사항을 제안하며 같이 성장할 수 있었습니다.

이런 경험은 단순한 코드 기여를 넘어 오픈소스 협업 능력과 문제 해결 능력 향상으로 이어집니다.

개인적으로 이번 경험을 통해, 저 스스로도 많은 성장을 할 수 있었다는 생각이 들었습니다.

<br>

## 5️⃣ Apache Gravitino 로컬에서 Test 하는 방법

다른 Apache Project 들과 동일하게, 두 가지 과정을 거쳐야 합니다.

1. \`./gradlew spotlessApply\` 를 통한 코드 포맷팅
2. \`./gradlew clean build\` 로컬에서의 빌드 테스트

그러나, 저 처럼 특정 모듈에 대한 부분만 변경을 하였다면, 그 부분만 따로 포맷팅하고 빌드 테스트를 할 수 있습니다.

예를 들면, core 모듈에 기여를 하셨다면, \`./gradlew :core:build\` 이런식으로 할 수 있습니다. ( 포맷팅도 동일합니다. )

<br>
<div align="center">◈</div>
<br>

# ✏️ 3. 결론

Apache Iceberg 와 함께, 흥미가 생긴 또 하나의 Apache 프로젝트였습니다.

2024년 6월에 인큐베이팅 되고, 2025년 6월 3일에 Apache의 TLP에 합류하게 된 프로젝트다보니, 아직 기여를 하는 사람들이 많지 않고, 재미난 이슈들도 많이 나오고 있습니다.

처음 기여를 시작하는 사람들에게도 너무 좋을 거 같고, 저처럼 **Contributor 를 넘어서 Maintainer 를 목표**로 하는 사람들에게는 너무 좋은 프로젝트가 아닐까 싶습니다.

아무 프로젝트가 아닌, 꽤 앞으로 쓰일 수 있는 좋은 프로젝트라 생각되기에, 더 적극적으로 기여를 해보고자 합니다.

긴 글 읽어주셔서 감사합니다. :D

`

export default content
