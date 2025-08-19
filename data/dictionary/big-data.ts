export const bigDataTechnologies = [
  {
    name: "🧊 Iceberg",
    description: "대용량 분석 데이터셋을 위한 오픈 테이블 포맷",
    category: "빅데이터",
    details: [
      {
        title: "💡 MOR(Merge-on-Read) vs COW(Copy-on-Write) 및 쓰기 모드 설정",
        summary: "Iceberg의 두 가지 주요 테이블 타입과 개별 연산별 설정 방법",
        date: "25.08.12",
        detail: `Apache Iceberg에서 테이블의 쓰기 모드(write.update.mode, write.delete.mode, write.merge.mode)는 COW(Copy-On-Write)와 MOR(Merge-On-Read) 중 선택할 수 있으며, 삽입, 수정, 삭제 연산마다 개별적으로 설정 가능합니다.

**COW (Copy-On-Write)**: 데이터를 삽입, 수정, 삭제할 때 기존 파일을 새로 복사하면서 변경 사항을 반영합니다. 즉, 적재 시점에 데이터가 실제 파일에 반영되므로 쓰기 비용이 크지만, 조회 시 최신 파일만 읽기 때문에 읽기 성능이 높습니다.

**MOR (Merge-On-Read)**: 데이터를 삽입, 수정, 삭제할 때 변경 내용은 별도의 로그 파일에 기록하고, 원본 데이터 파일과 병합하여 읽습니다. 따라서 쓰기 시점의 비용은 낮지만, 조회 시 로그와 원본을 합쳐야 하므로 읽기 비용이 상대적으로 높습니다.

즉, Iceberg 테이블에서는 삽입, 수정, 삭제 시점마다 COW와 MOR를 개별적으로 선택할 수 있으며, 테이블 사용 환경과 요구사항에 따라 어느 시점에 비용을 지불할지 결정하여 최적의 설정을 선택할 수 있습니다.`,
        codeExample: `CREATE TABLE spark_catalog.default.example_table (
    id INT,
    name STRING
)
USING iceberg
TBLPROPERTIES (
    'write.update.mode'='merge-on-read',   -- UPDATE는 MOR
    'write.delete.mode'='copy-on-write',   -- DELETE는 COW
    'write.merge.mode'='merge-on-read'     -- MERGE/INSERT는 MOR
);`,
      },
    ],
  },
  {
    name: "🐘 Hadoop",
    description: "대용량 데이터 처리를 위한 분산 컴퓨팅 프레임워크",
    category: "빅데이터",
    details: [
      {
        title: "💡 MapReduce Combiner와 결합법칙/교환법칙",
        summary: "맵 단계에서 중간 결과를 미리 합치는 Combiner의 동작 원리와 수학적 조건",
        date: "25.08.13",
        detail: `MapReduce의 Combiner는 맵 단계에서 생성된 중간 결과를 리듀서로 보내기 전에 로컬에서 미리 합치는 기능입니다. 예를 들어, 단어 수를 세는 작업에서 각 맵 노드가 처리한 문서에서 나온 단어별 개수를 먼저 합산한 후 리듀서로 보내면, 네트워크를 통해 전송되는 데이터 양을 크게 줄일 수 있습니다.

Combiner는 최적화용으로 사용되며, 항상 사용해도 되는 것은 아니고, 합치기 연산이 결합 법칙(associative)과 교환 법칙(commutative)을 만족할 때만 정확한 결과를 보장합니다.

**결합 법칙(associative law)**: 연산의 순서와 상관없이 결과가 같다는 법칙입니다.
예: (a+b)+c = a+(b+c)
단어 수 합산에서 각 맵 노드의 중간 결과를 어떤 순서로 합치든 최종 합계는 같다는 의미입니다.

**교환 법칙(commutative law)**: 피연산자의 순서를 바꾸어도 결과가 같다는 법칙입니다.
예: a+b = b+a
어떤 맵 노드의 결과를 먼저 합치든 나중에 합치든 최종 단어 수는 동일합니다.`,
      },
      {
        title: "💡 MapReduce 동작 조건",
        summary: "MapReduce가 실행되는 조건과 단순 데이터 읽기/쓰기와의 차이점",
        date: "25.08.15",
        detail: `HDFS의 put·get 명령이나 Hive의 단순 SELECT 구문은 데이터를 단순히 읽고 쓰는 작업만 수행하므로 MapReduce가 실행되지 않습니다. MapReduce는 GROUP BY나 JOIN처럼 대용량 데이터를 분산 처리하고 집계하는 연산이 필요할 때에만 동작합니다.

**최근 동향**: Hive나 Pig 등에서 MapReduce 대신 Tez나 Spark 같은 DAG 반 실행 엔진을 사용하여 동일한 분산 연산을 더 빠르고 효율적으로 수행할 수 있습니다. 이러한 엔진도 마찬가지로 단순 데이터 읽기/쓰기에는 동작하지 않고, 연산이 필요한 경우에만 실행됩니다.`,
      },
    ],
  },
  {
    name: "🗲 Spark",
    description: "대용량 데이터 처리를 위한 통합 분석 엔진",
    category: "빅데이터",
    details: [
      {
        title: "💡 Broadcast Join",
        summary:
          "작은 테이블을 모든 워커 노드에 미리 배포하여 큰 테이블과 로컬에서 조인하는 방식입니다. 셔플을 최소화하여 성능을 높이는 최적화 조인입니다.",
        date: "25.08.16",
        detail: `작은 테이블을 모든 워커 노드에 미리 배포하여 큰 테이블과 로컬에서 조인하는 방식입니다. 셔플을 최소화하여 성능을 높이는 최적화 조인입니다.

**예시 설명**
예를 들어, 직원 정보를 담은 작은 테이블과 수천만 건의 판매 기록을 담은 큰 테이블이 있을 때, 작은 직원 테이블을 모든 워커 노드에 브로드캐스트하면 각 워커 노드가 자신이 가진 판매 기록 파티션과 로컬에서 직원 정보를 바로 조인할 수 있습니다. 이 과정에서는 큰 테이블을 네트워크로 이동시키지 않아도 되므로 조인이 빠르게 수행됩니다.

**장점**
네트워크 셔플을 최소화하여 조인 속도가 빠릅니다.
구현이 간단하며, Spark가 자동으로 브로드캐스트를 최적화할 수 있습니다.

**단점**
작은 테이블이 너무 크면 워커 노드 메모리에 올라가지 않아 OOM(Out Of Memory) 오류가 발생할 수 있습니다.
데이터가 한쪽으로 치우친 skew가 발생하면 일부 파티션의 부하가 증가할 수 있습니다.

**OOM 문제 해결 방안**
spark.sql.autoBroadcastJoinThreshold 설정을 조정하여 브로드캐스트 가능한 테이블 크기를 제한합니다.
작은 테이블을 쪼개서 브로드캐스트하거나, 필요 시 일반 Shuffle Join으로 전환합니다.
메모리 확보를 위해 spark.executor.memory를 늘리거나, 불필요한 캐시를 해제합니다.`,
      },
    ],
  },
  {
    name: "🐟️ Paimon",
    description: "LSM Tree 기반의 실시간 레이크하우스 스토리지 엔진",
    category: "빅데이터",
    details: [
      {
        title: "💡 LSM Tree",
        summary: "대규모 데이터를 쓰기 효율적으로 처리하기 위해 설계된 자료구조",
        date: "25.08.17",
        detail: `**LSM Tree 구조와 동작 원리**

**LSM Tree란?**
LSM Tree(Log-Structured Merge Tree)는 대규모 데이터를 쓰기 효율적으로 처리하기 위해 설계된 자료구조입니다. 특히 디스크 기반 Key-Value Store인 LevelDB, RocksDB, Apache Paimon, HBase, Cassandra 등에서 많이 사용됩니다.

**핵심 아이디어**
LSM Tree의 핵심 아이디어는 쓰기 시 랜덤 I/O를 피하고 순차 I/O를 활용한다는 것입니다. 디스크에 바로 랜덤하게 쓰지 않고 메모리에 먼저 모아두다가 디스크에 배치(batch) 단위로 정렬된 파일로 내려쓰는 구조입��다.

**LSM Tree의 구성 요소**

1. **MemTable (메모리 영역)**: 쓰기가 먼저 기록되는 메모리 내 정렬된 자료구조입니다. 보통 SkipList나 Red-Black Tree를 사용하며, 빠른 쓰기 성능을 제공합니다. 일정 크기가 되면 디스크로 flush됩니다.

2. **SSTable (Sorted String Table, 디스크 영역)**: MemTable이 flush되어 디스크에 저장된 정렬된 불변(immutable) 파일입니다. 여러 레벨(Level 0, 1, 2...)로 구성되어 관리됩니다.

3. **WAL (Write-Ahead Log)**: MemTable에 쓰기 전에 로그에 기록해서 장애 시 복구 가능하도록 합니다.

**LSM Tree의 동작 순서**

1. **쓰기(Write) 과정**: WAL에 기록한 후 MemTable에 삽입합니다. MemTable이 가득 차면 디스크에 flush하여 SSTable 파일을 생성합니다.

2. **읽기(Read) 과정**: MemTable 확인 → ImmutableMemTable 확인 → 디스크의 여러 SSTable 검색 순서로 진행됩니다. 블룸 필터와 인덱스를 활용하여 효율적으로 검색합니다.

3. **삭제(Delete) 과정**: Tombstone 마커 기록 → 컴팩션 과정에서 실제 삭제 처리가 이루어집니다.

4. **컴팩션(Compaction) 과정**: 여러 SSTable을 병합하여 중복 제거, 공간 회수, tombstone 반영, 새로운 최적화된 SSTable을 생성합니다.

**기존 데이터 업데이트 처리**
LSM Tree에서는 기존 데이터의 업데이트를 직접 수정하지 않고 다음과 같은 방식으로 처리합니다:

**업데이트 메커니즘**
1. **새로운 버전 추가**: 업데이트할 때 기존 값을 수정하지 않고 새로운 버전의 키-값 쌍을 MemTable에 추가합니다
2. **타임스탬프 활용**: 각 키-값 쌍에 타임스탬프나 시퀀스 번호를 부여하여 최신 버전을 식별합니다
3. **읽기 시 최신 값 반환**: 읽기 요청 시 동일한 키에 대해 가장 최근 타임스탬프를 가진 값을 반환합니다

**업데이트 과정 예시**
초기 데이터: kim -> park (시간: t1)
업데이트: kim -> kang (시간: t2)
실제 저장: 
- kim -> park (t1)
- kim -> kang (t2) // 새로 추가
읽기 시: kim 조회하면 kang 반환 (t2가 최신이므로)

**컴팩션에서의 정리**
컴팩션 과정에서 동일한 키의 여러 버전 중 가장 최신 버전만 남기고 나머지는 제거합니다. 이를 통해 공간을 절약하고 읽기 성능을 향상시킵니다.

**장점과 주의사항**

**장점**
- **높은 쓰기 성능**: 순차 I/O를 통한 빠른 쓰기
- **대규모 데이터 처리**: 효율적인 공간 사용과 확장성
- **실시간 처리**: 지속적인 쓰기 워크로드에 최적화

**주의사항**
- **읽기 지연**: 여러 레벨을 검색해야 하므로 읽기가 상대적으로 느릴 수 있음
- **컴팩션 오버헤드**: 정기적인 컴팩션으로 인한 I/O 증가와 레이턴시 급증 가능성
- **공간 증폭**: 중복 데이터와 삭제된 데이터가 컴팩션 전까지 공간을 차지함`,
        codeExample: `-- Paimon에서 LSM Tree 기반 테이블 생성
CREATE TABLE lsm_example (
    id BIGINT,
    data STRING,
    ts TIMESTAMP,
    PRIMARY KEY (id) NOT ENFORCED
) WITH (
    'compaction.max.file-num' = '50',  -- 컴팩션 트리거 파일 수
    'compaction.min.file-num' = '5',   -- 최소 컴팩션 파일 수
    'write-buffer-size' = '256mb'      -- MemTable 크기
);

-- 스트리밍 데이터 삽입 (LSM Tree의 순차 쓰기 활용)
INSERT INTO lsm_example 
SELECT id, data, PROCTIME() as ts
FROM kafka_source;`,
      },
    ],
  },
]
