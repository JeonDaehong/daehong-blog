export const csTechnologies = [
  {
    name: "⚙️ 데이터 엔지니어링",
    description: "대규모 데이터 처리와 관리를 위한 시스템 설계 및 구축",
    category: "CS",
    details: [
      {
        title: "💡 데이터 파티셔닝(Partitioning)",
        summary: "대규모 데이터를 다룰 때 효율적인 조회와 비용 절감을 위해 데이터를 기준으로 나누어 저장하는 방식",
        date: "25.08.17",
        detail: `대규모 데이터를 다룰 때 효율적인 조회와 비용 절감을 위해 데이터를 기준(날짜, 사용자, 지역 등)으로 나누어 저장하는 방식입니다.

**핵심 개념**
도서관의 책 분류처럼, 필요한 파티션만 읽으면 되므로 풀스캔을 피하고 성능 향상이 가능합니다. 예를 들어, 로그를 날짜별로 파티셔닝하거나 주문 데이터를 국가+일자별로 파티셔닝하면 특정 조건 조회가 빠릅니다.

**최신 테이블 포맷의 최적화**
Iceberg, Hudi, DeltaLake 같은 최신 테이블 포맷은 Partition Pruning으로 필요한 파티션만 읽는 최적화를 지원합니다. 이를 통해 쿼리 실행 시 불필요한 파티션을 스캔하지 않아 성능과 비용을 크게 개선할 수 있습니다.

**설계 원칙**
핵심은 단순 저장이 아니라, 분석 패턴에 맞춘 데이터 구조 설계 원칙이라는 점입니다. 데이터를 어떻게 나눌지는 실제 쿼리 패턴과 데이터 접근 방식을 고려하여 결정해야 합니다.

**주**
user_id처럼 고유값이 많은 컬럼은 파티셔닝에 부적합.
날짜, 지역처럼 적당한 카디널리티의 컬럼이 적합.

**파티셔닝 전략 예시**
- **시간 기반**: 로그 데이터를 년/월/일별로 파티셔닝
- **지역 기반**: 글로벌 서비스의 사용자 데이터를 국가별로 파티셔닝  
- **카테고리 기반**: 상품 데이터를 카테고리별로 파티셔닝
- **복합 파티셔닝**: 국가+날짜, 사용자그룹+시간대 등 여러 기준 조합`,
        codeExample: `-- Iceberg 테이블 파티셔닝 예시
CREATE TABLE sales_data (
    order_id BIGINT,
    customer_id BIGINT,
    order_date DATE,
    country STRING,
    amount DECIMAL(10,2)
)
USING iceberg
PARTITIONED BY (country, days(order_date))
TBLPROPERTIES (
    'write.target-file-size-bytes'='134217728'  -- 128MB
);

-- 파티션 프루닝이 적용되는 쿼리
SELECT SUM(amount) 
FROM sales_data 
WHERE country = 'KR' 
  AND order_date >= '2024-01-01' 
  AND order_date < '2024-02-01';`,
      },
      {
        title: "💡 증분 처리(Incremental Processing)",
        summary: "전체 데이터를 매번 다시 처리하지 않고, 새로 추가·변경된 데이터만 처리하는 방식",
        date: "25.08.17",
        detail: `전체 데이터를 매번 다시 처리하지 않고, 새로 추가·변경된 데이터만 처리하는 방식입니다.

**핵심 효과**
실행 시간 단축, 컴퓨팅 자원 절약, 클라우드 비용 절감 효과를 얻을 수 있습니다. 특히 대규모 데이터 파이프라인에서는 필수적인 최적화 기법입니다.

**대표 기술: CDC(Change Data Capture)**
변경(추가·수정·삭제)만 추적해서 처리하는 CDC 기술이 핵심입니다. 데이터베이스의 변경 로그를 실시간으로 캡처하여 다운스트림 시스템에 전달합니다.

**구현 도구**
- **CDC 도구**: Debezium, AWS DMS, Oracle GoldenGate
- **스트리밍 처리**: Flink, Kafka Streams, Spark Structured Streaming
- **저장소 계층**: Iceberg, Delta Lake, Hudi → 증분 쿼리와 최적화 지원

**활용 기법**
- **파티셔닝**: 시간 기반 파티션으로 최신 데이터만 처리
- **스냅샷+Diff 방식**: 이전 상태와 현재 상태 비교
- **변경 로그 테이블**: 변경 이벤트를 별도 테이블로 관리
- **워터마크 처리**: 늦게 도착하는 데이터 처리 전략

**현대 데이터 파이프라인의 기본 원칙**
증분 처리는 현대 데이터 파이프라인의 기본 원칙입니다. 더 빠르고 안정적이며 비용 효율적인 데이터 처리를 가능하게 합니다.`,
        codeExample: `-- Delta Lake 증분 처리 예시
-- 1. 변경된 데이터만 식별하여 처리
CREATE OR REPLACE TEMPORARY VIEW incremental_data AS
SELECT *
FROM source_table
WHERE last_modified > (
  SELECT MAX(last_processed_time) 
  FROM target_table_metadata
);

-- 2. MERGE를 사용한 증분 업데이트
MERGE INTO target_table t
USING incremental_data s
ON t.id = s.id
WHEN MATCHED THEN 
  UPDATE SET *
WHEN NOT MATCHED THEN 
  INSERT *;

-- 3. Spark Structured Streaming 증분 처리
spark.readStream
  .format("delta")
  .option("readChangeFeed", "true")
  .option("startingVersion", "latest")
  .table("source_table")
  .writeStream
  .format("delta")
  .option("checkpointLocation", "/path/to/checkpoint")
  .trigger(Trigger.ProcessingTime("1 minute"))
  .start();`,
      },
      {
        title: "💡 ETL vs ELT",
        summary: "데이터를 추출 후 변환하고 적재하는 ETL과 추출 후 적재하고 변환하는 ELT의 차이점과 활용 방법",
        date: "25.08.21",
        detail: `**💡 정의:**
**ETL (Extract → Transform → Load)**: 데이터를 추출 후 변환하고 정제하여 저장소에 적재
**ELT (Extract → Load → Transform)**: 데이터를 추출 후 원본 그대로 저장소에 적재하고, 저장된 환경에서 변환

**💡 비유:**
ETL: 이삿짐을 싸기 전에 정리해서 박스에 담아 옮김 → 도착 즉시 사용 가능
ELT: 창고에 일단 짐을 다 옮기고, 필요 시 정리 → 유연하게 재정리 가능

**💡 활용 예시:**
ETL: 로그 데이터에서 불필요한 컬럼 제거, 사용자별 집계 후 적재 → 쿼리 속도 빠르고 저장 효율 높음
ELT: 로그 원본 그대로 적재 → 필요 시 SQL/파이프라인으로 변환 → 분석 요구 변화에 유연

**💡 장단점 비교:**
ETL: 데이터를 추출 후 변환하고 정제한 뒤 적재. 장점은 저장 공간 절약과 쿼리 속도가 빠르다는 것. 단점은 새로운 분석 요구사항에 대응하기 어렵다는 점.
ELT: 데이터를 추출 후 원본 그대로 적재하고, 필요할 때 변환. 장점은 유연성이 높고 원본 데이터를 보존할 수 있음. 단점은 저장소와 컴퓨팅 비용이 증가한다는 점.

**💡 결론: 환경과 목적에 맞게 선택:**
전통 온프레미스 → ETL
클라우드 데이터 웨어하우스 → ELT
→ 핵심은 데이터를 필요한 순간 신뢰할 수 있는 형태로 제공하는 구조 설계.`,
        codeExample: ``,
      },
    ],
  },
]
