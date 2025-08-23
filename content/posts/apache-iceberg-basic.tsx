export const meta = {
  title: "📘 Iceberg Basic 1편: 왜 Netflix는 Hive를 버리고 Iceberg를 선택했을까?",
  publishedAt: "2025-06-21",
  summary: "Apache Iceberg 기본적인 내용을 정리한 1편 내용입니다. 기본 개념과 등장 배경을 소개합니다.",
  thumbnail: "/apache-iceberg-professional.png",
  author: {
    name: "전대홍",
    image: "/profile.jpg",
  },
  category: "빅데이터",
  tags: ["Apache Iceberg", "Data Engineering", "Open Table Format"],
  excerpt: "Apache Iceberg의 기본 개념과 혁신적인 테이블 포맷 기술을 소개합니다.",
}

const content = `
# ✏️ 1. 서론

<div className="my-8">
  <img src="/apache-iceberg-professional.png" alt="Apache Iceberg" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

현대 데이터 환경에서 대용량 데이터를 효율적으로 관리하는 것은 모든 데이터 엔지니어와 분석가들에게 중요한 과제입니다. 기존의 Apache Hive가 가진 한계를 넘어, 더 유연하고 강력한 데이터 관리 솔루션을 찾고 계시다면 **Apache Iceberg** 가 그 해답이 될 수 있습니다.

저는 변화하는 데이터 환경에 발맞추어, **사내에서 운영 중인 하둡 클러스터 기반의 솔루션을 개선하고 클라우드 환경에 Apache Iceberg를 도입하기 위한 학습을 진행**하였습니다. 그 과정에서 사내 세션 발표를 통해 내용을 공유하였으며, 이번 글에서는 당시 발표 내용을 토대로 Iceberg의 주요 개념과 특징을 정리하여 나누고자 합니다.

이번 공부를 위해 주로 학습한 자료는 아래 책과, Iceberg Docs, 그리고 Iceberg 의 오픈 소스입니다.

<div className="my-8">
  <img src="/iceberg/iceberg_2.png" alt="Apache Iceberg" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

사내에 Iceberg 를 도입한 결과를 먼저 말씀드리고 본문을 시작하고자 합니다.

사내 환경에 Apache Iceberg를 실제로 도입하면서 느낀 가장 큰 변화는 **데이터 관리의 단순화와 확장성 확보**였습니다. 기존 Hive 메타스토어 기반 테이블 관리에서는 스키마 변경이나 파티션 관리 과정이 복잡했지만, Iceberg를 적용한 이후에는 이러한 작업들이 훨씬 더 직관적이고 안정적으로 수행되었습니다.

특히 다음과 같은 개선 효과가 있었습니다.

- **스키마 진화 지원**: 새로운 컬럼 추가, 컬럼 이름 변경 등 스키마 변경을 안전하게 수행할 수 있었습니다.  
- **데이터 관리 단순화**: 스냅샷 관리와 롤백 기능을 통해 운영 환경에서 발생할 수 있는 위험을 줄일 수 있었습니다.  
- **클라우드 친화성**: 하둡 클러스터뿐 아니라 클라우드 환경과도 자연스럽게 연동되어, 데이터 플랫폼의 유연성이 크게 향상되었습니다.  
- **쿼리 성능 개선**: Iceberg의 고급 파티셔닝과 메타데이터 관리 덕분에 쿼리 효율이 높아졌습니다.  

이러한 효과는 단순히 기술적인 개선에 그치지 않고, **데이터 엔지니어링 팀이 더 빠르게 비즈니스 요구에 대응할 수 있는 기반**을 마련했다는 점에서 의미가 있다고 봅니다.

<br>
<div align="center">◈</div>
<br>

# ✏️ 2. 공부에 활용한 실습 환경

학습 과정에서 저는 Apache Iceberg를 직접 활용하여 파이프라인을 설계하고 구현해 보았습니다.  

이를 통해 Iceberg의 특성과 장점을 보다 실무적으로 체감할 수 있었으며, 아래 아키텍처는 당시 실습을 위해 구성한 환경을 나타낸 것입니다.

<div className="my-8">
  <img src="/iceberg/iceberg_1.png" alt="Apache Iceberg" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

간단하게 설명하면,
데이터 수집 단계에서는 JAR 파일 형태의 데이터 소스가 Docker 컨테이너로 구성된 Apache Kafka 클러스터로 전송됩니다. Kafka 클러스터는 3개의 워커 노드로 구성되어 있으며, 각 워커는 토픽을 통해 데이터를 처리하고 Zookeeper가 클러스터 메타데이터와 설정 정보를 관리합니다.

스트림 처리 계층에서는 Apache Spark Streaming이 Kafka로부터 실시간으로 데이터를 소비하여 처리합니다. Spark 클러스터는 마스터-워커 구조로 운영되며, 마스터 노드가 작업을 분산하고 워커 노드들이 실제 데이터 처리를 수행합니다. 이 과정에서 시각화를 위해 Apache Zeppelin이 별도의 Docker 컨테이너로 구성되어 데이터 분석과 시각화 인터페이스를 제공합니다.

데이터 저장소 계층에는 S3 호환 스토리지 시스템이 구축되어 있습니다. 데이터 레이크하우스 아키텍처를 구현하기 위해 Apache Iceberg가 메타데이터 관리를 담당하고, 스테이징 영역에서는 Apache Zeppelin과 함께 추가적인 데이터 처리 도구들이 배치되어 있습니다. 모든 데이터는 최종적으로 MinIO 객체 스토리지에 저장되며, 이는 확장 가능한 데이터 레이크 역할을 수행합니다.

그리고 사용한 버전은 아래와 같습니다.

- Apache Iceberg 1.6.1
- Apache Spark 3.4.4
- Apache Zeppelin 0.11.2
- Apache Kafka 7.3.2

마지막으로 사용한 테이블의 스키마 정보는 아래와 같습니다.

\`\`\`sql
CREATE NAMESPACE IF NOT EXISTS lol_db;

CREATE TABLE IF NOT EXISTS lol_db.game_table (
    gameID STRING,
    uniqueId STRING,
    email STRING,
    password STRING,
    tier STRING,
    sex STRING,
    age STRING,
    nickName STRING,
    team STRING,
    ip STRING,
    champion STRING,
    kill STRING,
    death STRING,
    assist STRING,
    gamePlayTime STRING,
    isWin STRING,
    createGameDate STRING
)
USING iceberg
LOCATION 's3a://league-of-legend-iceberg/ice-berg/lol_db/game_table'
PARTITIONED BY (tier)
TBLPROPERTIES (
    'write.merge.mode' = 'merge-on-read',
    'write.update.mode' = 'merge-on-read',
    'write.delete.mode' = 'merge-on-read',
    'write.metadata.puffin.enabled' = 'true',
    'write.target-file-size-bytes' = '134217728'
);

\`\`\`

<br>
<div align="center">◈</div>
<br>

# ✏️ 3. 본론

## 🖊️ 3.1. Apache Hive 의 한계

Apache Iceberg 에 대해 알아보기 전에, 그 등장 원인이 되는 Apache Hive 에 대하여 먼저 알아보겠습니다.

Apache Hive는 대용량 Data Warehousing 및 SQL 기반 쿼리 처리를 지원하는 DW 시스템입니다.  
주로 Hadoop 분산 파일 시스템(HDFS) 위에서 동작하며, 사용자가 익숙한 SQL 형식의 언어인 **HiveQL**을 통해 데이터를 조회할 수 있습니다.

쉽게 말해 Hive는 SQL을 지원하는 거대한 데이터 창고와 같은 역할을 하며, Hadoop에 저장된 데이터를 비교적 쉽게 다룰 수 있게 해줍니다.  
다만 Hive는 **정형 데이터 처리**와 **배치 처리**에 최적화되어 있으며, 오늘날 요구되는 실시간·대규모 데이터 처리에서는 여러 한계가 존재합니다.

Hive는 빅데이터 시대를 열었던 대표적인 솔루션이지만, 점차 늘어나는 데이터 처리 요구사항을 모두 만족시키기에는 다음과 같은 한계가 있었습니다.

### 1️⃣ ACID 지원 부족
- 하나의 파일에 대해 동시에 여러 작업이 실행되면 충돌 문제가 발생할 수 있음
- \`INSERT OVERWRITE\` 방식으로 동작하기 때문에, 오류 발생 시 데이터 복구가 어려움
- Hive ACID 트랜잭션 기능이 존재하긴 하지만, ORC 포맷 기반에 제약이 크고, Delta 파일 증가 및 Compaction 작업으로 성능 저하가 발생함

### 2️⃣ Meta Store Bottleneck
- 파티션 개수가 많아지면 Meta Store가 순차적으로 조회 → 성능 저하
- Hive Server는 Thrift Server 기반 단일 프로세스 구조라, 동시 요청이 많으면 병목과 Connection Timeout 발생
- RDBMS 기반 Meta Store 자체도 Connection Pool 한계에 부딪히며 처리 속도 저하 가능

### 3️⃣ 스키마 확장성과 파티션 필터링의 비효율성
- 스키마 변경 시 전체 테이블을 다시 작성해야 하는 번거로움
- 컬럼 삭제 불가, \`REPLACE COLUMNS\` 사용 → 잘못 변경 시 데이터 유실 위험
- 디렉터리 기반 파티션 구조로 인해 새로운 파티션 추가 시 전체 데이터를 다시 적재해야 함
- 파티션되지 않은 컬럼 조건 검색 시 FULL SCAN 발생 → 심각한 성능 저하

### 4️⃣ 디렉터리 및 파일 조회 지연 문제
- 데이터 양이 폭발적으로 증가하면서, 디렉터리와 파일을 직접 스캔하는 Hive 구조는 성능 저하 유발
- 잘못된 데이터가 저장되었을 경우 Rollback 기능이 없어 다시 적재해야 하는 문제 발생

**이러한 이유로 Iceberg 가 등장하게 됩니다.**

<br>

## 🖊️ 3.2. Apache Iceberg 의 등장

**Apache Iceberg**는 2017년 **Netflix**에서 **Apache Hive**의 한계를 극복하기 위해 개발한 **혁신적인 개방형 테이블 형식의 데이터 관리 시스템**입니다. Netflix는 **대규모 데이터 처리 환경**에서 기존 Hive 테이블 포맷의 **성능과 확장성 문제**를 해결하고자 이 프로젝트를 시작했습니다.  

<div className="my-8">
  <img src="/iceberg/Netflix-Logo.png" alt="Apache Iceberg" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

Iceberg의 가장 중요한 특징은 **Apache 재단에 기부된 오픈소스 프로젝트**로서, **벤더 종속성 없이 다양한 데이터 엔진에서 효율적으로 데이터를 관리**할 수 있다는 점입니다. 이는 **멀티 클라우드 환경**이나 **하이브리드 데이터 아키텍처**에서 특히 중요한 장점으로 작용합니다.  

기술적 관점에서 Iceberg는 **Apache Hudi**, **Delta Lake**와 함께 **차세대 테이블 포맷의 주요 솔루션** 중 하나로 인정받고 있습니다. 이들은 모두 **기존 데이터 레이크의 한계를 극복**하고 **데이터 레이크하우스 아키텍처**를 구현하기 위한 핵심 기술들입니다.  

Iceberg의 혁신적인 기능 중 하나는 **파일 집합으로 구성하여 쿼리 엔진이 데이터를 효율적으로 처리**할 수 있도록 돕는다는 것입니다. 또한 **디렉터리 구조 방식이 아닌 메타데이터를 통해 정확한 데이터 파일들을 신속하게 조회**할 수 있는 구조를 제공합니다. 이를 통해 **대용량 데이터셋에서도 빠른 쿼리 성능**을 보장하고, **데이터 버전 관리**와 **스키마 진화** 등의 **고급 기능**을 제공할 수 있습니다.

<br>

## 🖊️ 3.3. Apache Iceberg 의 철학과 강점

저는 Iceberg 를 공부하면서 **개발할 때 고려한 4가지 핵심 설계 철학과, 7가지의 주요 강점이 있다고 생각했습니다.**

먼저 **4가지 주요 철학**은 다음과 같습니다.

<div className="my-8">
  <img src="/iceberg/iceberg_3.png" alt="Apache Iceberg" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

1. **일관성(Consistency):** 동시에 여러 작업이 실행되어도 데이터의 일관성을 보장한다는 의미입니다. Iceberg는 ACID 트랜잭션을 지원하여 데이터 무결성을 유지합니다.
2. **성능(Performance):** Iceberg는 대용량 데이터 처리에서도 빠른 쿼리 성능을 제공합니다. 효율적인 메타데이터 관리와 파일 구조 최적화를 통해 이를 실현합니다.
3. **편의성(Convenience):** 복잡한 데이터 관리 작업을 간단하게 처리할 수 있도록 설계되었으며, 기존 도구들과의 호환성도 뛰어납니다.
4. **확장성(Scalability):**데이터 볼륨이 증가해도 성능 저하 없이 시스템이 확장될 수 있음을 의미합니다. 페타바이트 규모의 데이터도 효율적으로 관리할 수 있습니다.

이 4가지 원칙은 Iceberg가 현대적인 데이터 레이크하우스 환경에서 요구되는 모든 핵심 요소들을 균형있게 만족시키도록 설계되었음을 보여줍니다.

<br>

다음은 **7가지의 주요 강점** 입니다.

<br>

### 1️⃣ 강력한 ACID 지원

<div className="my-8">
  <img src="/iceberg/iceberg_4.png" alt="Apache Iceberg" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

Iceberg는 스냅샷 ID를 통해 ACID 속성을 보장합니다.
( 스냅샷 ID 에 대하여서는, 추후 아키텍처를 소개 할 때 자세히 설명하겠습니다. )

각 데이터 변경 시점마다 고유한 스냅샷 ID가 생성되어 데이터의 **원자성(Atomicity), 일관성(Consistency), 격리성(Isolation), 지속성(Durability)**을 모두 만족시킵니다

**Optimistic Locking** 방식을 사용하여 변경이 일어나기 전 데이터 버전과 변경이 일어난 후의 데이터 버전을 비교하여 충돌 여부를 판단하고 제어합니다.

<div className="my-8">
  <img src="/iceberg/iceberg_5.png" alt="Apache Iceberg" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

실제 동시성 제어 시나리오를 보여줍니다.

A Transaction과 B Transaction이 동시에 실행될 때, 각각 스냅샷 ID 1001에서 시작하지만 A Transaction이 먼저 커밋되어 스냅샷 ID 1002를 생성합니다.

B Transaction이 커밋을 시도할 때, 시작점인 스냅샷 ID 1001과 현재 최신 스냅샷 ID 1002를 비교하여 충돌을 감지합니다. 충돌이 발견되면 에러를 발생시키고 롤백 처리하거나, 충돌이 없다면 새로운 스냅샷 ID를 채번하여 커밋을 완료합니다.

<div className="my-8">
  <img src="/iceberg/iceberg_6.png" alt="Apache Iceberg" style="border: 2px solid skyblue; border-radius: 4px;" width="100%" />
</div>

각 트랜잭션은 독립적으로 특정 스냅샷 시점의 데이터를 조회할 수 있습니다.

A Transaction은 스냅샷 ID 1001의 데이터를 조회하고, 다른 트랜잭션은 스냅샷 ID 1003의 데이터를 조회하며, B Transaction은 스냅샷 ID 1002의 데이터를 조회합니다.

이러한 메커니즘을 통해 Iceberg는 대규모 분산 환경에서도 데이터 무결성을 보장하면서 동시에 여러 작업이 안전하게 수행될 수 있도록 지원합니다.

<br>

### 2️⃣ 파티션의 변경 및 확장성 Partition Evolution

<br>

### 3️⃣ Hidden Partitioning

<br>

### 4️⃣ 효율적인 행 수준 테이블 작업(COW vs MOR)

<br>

### 5️⃣ Time Travel

<br>

### 6️⃣ Version Roll Back

<br>

### 7️⃣ 제약 없는 스키마 변경









`

export default content
