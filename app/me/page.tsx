"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Code,
  GraduationCap,
  Shield,
  Users,
  Github,
  ExternalLink,
  GitPullRequest,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function MePage() {
  const coreSkills = [
    { name: "Java", logo: "/logos/java.png" },
    { name: "Spring Boot", logo: "/logos/spring-boot.png" },
    { name: "MySQL", logo: "/logos/mysql.png" },
    { name: "Apache Spark", logo: "/logos/apache-spark.png" },
    { name: "Apache Iceberg", logo: "/logos/apache-iceberg.png" },
    { name: "Apache Hadoop", logo: "/logos/apache-hadoop.png" },
    { name: "Apache Hive", logo: "/logos/apache-hive.png" },
    { name: "Apache Zookeeper", logo: "/logos/apache-zookeeper.png" },
  ]

  const experiences = [
    {
      company: "(주)디딤365",
      team: "데이터솔루션팀",
      position: "선임(대리)",
      role: "소프트웨어개발자 / 데이터엔지니어",
      period: "2025.03 - 현재",
      location: "서울시 구로구",
      description: "AI · Big Data · Cloud 매니지먼트 전문기업. 금융 도메인 빅데이터 솔루션 사업.",
      achievements: [
        "수십 TB 이상의 데이터 처리 환경 구축 / 운영 경험 보유",
        "Spark · 클라우드 기반의 ETL 배치 솔루션 설계 및 개발",
        "Hadoop 기반의 레거시 솔루션 유지보수 및 성능 최적화",
        "최신 오픈소스 기술 도입 및 빠른 학습을 통한 팀 내 전문성 강화에 기여 (Apache Iceberg, DuckDB 세션 발표 및 신규 솔루션 기술도입 어필)",
      ],
    },
    {
      company: "(주)디세이코리아",
      team: "개발팀",
      position: "사원(연구원)",
      role: "소프트웨어개발자",
      period: "2022.04 - 2023.08",
      location: "경기도 용인시",
      description: "AI 기반 스마트 팩토리 솔루션 전문기업. 여러 도메인에 대한 SI 사업.",
      achievements: [
        "이커머스 B2C 플랫폼 개발 (DB 최적화, 상품 검색 성능 향상에 기여)",
        "AI 솔루션 유지보수 및 성능 최적화",
        "레거시 개발 방식을 개선 및 사내 개발 표준화를 주도",
      ],
    },
  ]

  const openSourceContributions = [
    {
      name: "Apache Iceberg",
      role: "Contributor",
      description: "대규모 데이터를 안정적으로 관리하고, 효율적으로 처리할 수 있는 테이블 포맷에 기여하였습니다.",
      contributions: "2 PRs merged",
      prs: [
        {
          title: "Flink Catalog v2.0: MiniCluster 의존성 제거",
          description: "Flink: Remove the MiniClusterWithClientResource dependency",
          status: "Merged (2025.05)",
          link: "https://github.com/apache/iceberg/pull/13021",
        },
        {
          title: "Flink Catalog MiniCluster 의존성 제거 Backport",
          description: "Flink 1.19, 1.20: Remove the MiniClusterWithClientResource dependency",
          status: "Merged (2025.05)",
          link: "https://github.com/apache/iceberg/pull/13165",
        },
      ],
    },
    {
      name: "Apache Gravitino",
      role: "Contributor",
      description: "다양한 데이터 소스의 메타데이터를 통합적으로 관리하고 거버넌스를 제공하는 시스템에 기여하였습니다.",
      contributions: "1 PR merged",
      prs: [
        {
          title: "fix: call request.validate() in PartitionOperations.java",
          description:
            "PartitionOperations.java의 addPartitions 메서드에 request.validate() 호출을 추가하여 잘못된 요청을 적절히 거부하도록 개선",
          status: "Merged (2025.08)",
          link: "https://github.com/apache/gravitino/pull/8098",
        },
      ],
    },
    {
      name: "Spring Kafka",
      role: "Contributor",
      description: "스프링 애플리케이션에서 Kafka 메시징을 쉽게 연동하고 관리할 수 있는 프레임워크에 기여하였습니다.",
      contributions: "1 PR merged",
      prs: [
        {
          title: "RetryTopic 기본 Template Bean 이름 변경",
          description:
            "GH-3514: Change default template bean name from retryTopicDefaultKafkaTemplate to defaultRetryTopicKafkaTemplate.",
          status: "Merged (2024.10)",
          link: "https://github.com/spring-projects/spring-kafka/pull/3543",
        },
      ],
    },
  ]

  const projects = [
    {
      name: "NH 금융 빅데이터 개인신용정보 파기 프로세스 성능 개선",
      company: "디딤365",
      description: "하둡 에코시스템 기반 대용량 데이터 파기 시스템 성능 개선 및 자동화",
      tech: ["Java", "Scala", "Spring", "Spark", "Hadoop", "Yarn", "Hive", "Zookeeper", "MySQL"],
      period: "2025.04 - 2025.06",
      role: "빅데이터 개발자 (70% 기여)",
      environment: "30대 하둡 클러스터 환경, 수십~수백 TB 데이터",
      achievements: [
        "Spark·Hive 기반 파이프라인 최적화로 처리 성능 3배 이상 개선",
        "집계 자동화로 작업 시간 1시간 → 5분 미만으로 단축",
        "YARN·TCP·OOM 등 운영 이슈 해결로 시스템 안정성 확보",
        "재실행 및 복구 기능 추가로 운영 편의성과 대응력 향상",
        "프로젝트 성공으로 고객 신뢰 확보 및 후속 계약 유치",
      ],
      details: {
        background:
          "Hive 기반의 빅데이터 개인신용정보 파기 시스템 성능 개선, 금융감독원 제출용 파기 데이터 자동 수집/집계, 운영간 발생하는 주요 이슈 해결",
        challenges: [
          {
            title: "Spark 기반의 데이터 처리(파기) 성능 향상",
            problem:
              "기존의 데이터 처리(파기) 작업은 전체 소요 시간이 길어 금융감독원 자료 제출 기한을 맞추기 어려웠으며, 작업 중 실무자가 지속적으로 모니터링해야 하는 등 안정성 측면에서도 문제가 있었음",
            solution:
              "Application 내 멀티 스레드(Multi-Thread) 구조 적용, Spark의 병렬 분산 처리 구조를 활용한 파기 작업 최적화",
            result:
              "데이터 파기 처리 시간 3배 이상 단축 (기존 3시간 → 1시간), Spark 내 리소스 사용 효율 개선, Executor 메모리 낭비 최소화",
          },
          {
            title: "집계 자동화 및 집계 성능 향상",
            problem:
              "파기 작업 완료 후 실무자가 수동으로 집계 및 문서화를 수행해야 했으며, 이로 인해 반복적인 수작업과 휴먼에러 발생 가능성이 높았음",
            solution:
              "전체적인 프로세스 재설계 및 개선을 통한 집계 자동화, Impala를 활용한 고속 질의 처리 및 테이블 스캔 최소화",
            result:
              "집계 업무 자동화를 통한 운영 시간 절감, 기존 1시간 이상 소요되던 집계 작업을 5분 미만으로 단축, 반복 작업에서 발생하던 수동 오류 방지 및 운영 효율 증가",
          },
          {
            title: "Spark Data Skew로 인한 OOM 문제 해결",
            problem:
              "기존 로직에서는 성능 향상을 위해 Broadcast Join이 무분별하게 사용되었으며, 특히 Skew가 있는 키에 대해 특정 Task에 메모리 부담이 집중되어 OOM 문제가 빈번히 발생함",
            solution:
              "Broadcast Join을 제거하고, 테이블 크기와 분산 특성에 따라 Shuffle 기반 Sort-Merge Join 또는 Repartition Join으로 변경",
            result:
              "OOM 오류 제거, 작업 성공률 99% 달성, Skew Key 처리에 따른 Task 실행 시간 균등화 및 전체 Job 처리 시간 안정화",
          },
        ],
      },
    },
    {
      name: "Didim-DP Batch Cloud 개발",
      company: "디딤365",
      description: "클라우드 기반 데이터 파이프라인 설계 및 개발, DAG 기반 유연한 데이터 처리 솔루션",
      tech: [
        "Java",
        "Scala",
        "SpringBoot",
        "Spark",
        "Iceberg",
        "DuckDB",
        "Minio",
        "AWS S3",
        "AWS Aurora",
        "Hive",
        "Zookeeper",
        "MySQL",
        "Oracle",
      ],
      period: "2024.07 - 2025.03",
      role: "개발자 (30% 기여, 7명 팀)",
      environment: "7대 물리적 서버 및 클라우드 환경",
      achievements: [
        "삼성 Monimo 납품 및 안정적 운영으로 회사 수익에 기여",
        "고도화를 통해 삼성SDS 등 여러 기업과의 POC 기회 확보",
        "Iceberg·DuckDB 도입 및 스냅샷·고아 파일 정리 체계 구현으로 성능 및 운영 효율 향상",
        "Spark Connect 기반 분리형 아키텍처로 안정적이고 확장 가능한 데이터 처리 시스템 구축",
        "Hadoop 의존성 제거 및 경량화로 일 25억 건 처리환경에서도 고성능·고안정성 실현",
      ],
      details: {
        background:
          "기존 Hadoop 에코시스템에 종속된 아키텍처에서 벗어나, 클라우드 환경에서도 유연하게 동작 가능한 데이터 처리 솔루션을 자체 개발. DB, Cloud Storage, NAS, 서버, Hive 등 다양한 엔드포인트에서 데이터를 추출·적재할 수 있는 구조 구현",
        challenges: [
          {
            title: "Iceberg 만료 스냅샷 및 고아 파일 정리 시스템 구축",
            problem:
              "Iceberg 테이블이 운영되면서 시간이 지남에 따라 만료된 스냅샷과 참조되지 않는 고아 파일이 누적되어, 스토리지 사용량 증가 및 테이블 관리 복잡도가 높아지는 문제가 발생",
            solution:
              "Iceberg API를 활용하여 만료된 스냅샷과 데이터 파일을 주기적으로 정리하는 자동화 시스템 개발, Small 파일에 대한 주기적인 Compaction 기능을 Spark 애플리케이션으로 제공",
            result:
              "Iceberg 테이블 메타데이터 크기를 60% 이상 절감하고, 파일 시스템 내 고아 파일을 안정적으로 제거, 자동화된 정리 주기를 통해 테이블 정합성이 지속적으로 유지되며 운영 부담 최소화",
          },
          {
            title: "이중화를 통한 솔루션의 안정성 확보",
            problem:
              "솔루션 초기에는 핵심 모듈이 단일 서버에 집중되어 있어, 서버 장애 발생 시 전체 서비스에 영향을 미치는 단점이 존재",
            solution:
              "서비스 디스커버리 및 인스턴스 헬스 체크 기능을 제공하는 Eureka를 도입하여 H/A 구조를 구성, Zookeeper와 DB 기반 분산 Lock을 결합하여 다중 서버 환경에서도 작업 충돌 없이 안정적인 분산 처리가 가능하도록 제어 로직 구현",
            result:
              "단일 장애 지점을 제거하고, 서버 장애 시에도 자동으로 대기 인스턴스로 트래픽이 전환되어 무중단 서비스 운영 가능, 장애 대응 시간 및 재시작 지점 복원 처리 시간이 대폭 감소",
          },
        ],
      },
    },
    {
      name: "K-V 이커머스 물류 통합 플랫폼 서비스 개발",
      company: "디세이코리아",
      description: "국내-베트남 간 이커머스 물류 연동 통합 플랫폼, QR 기반 물류 추적 및 통합관리",
      tech: ["Java", "Spring", "Mybatis", "MySQL"],
      period: "2022.06 - 2023.07",
      role: "개발자 (30% 기여, 5명 팀)",
      environment: "국내 서버 1대, 베트남 서버 1대",
      achievements: [
        "국내와 베트남 양국에 서비스 오픈을 완료하여 글로벌 운영 기반을 확보",
        "ngram 기반 Full Text Index 및 쿼리 최적화를 통해 상품 조회 속도를 70% 이상 개선",
        "배치 기반 데이터 동기화로 양국 간 DB 정합성을 안정적으로 유지",
        "공통 인프라 코드 개선으로 시스템 운영 안정성과 유지보수 효율을 향상",
      ],
      details: {
        background:
          "국내 브랜드 상품을 베트남 매장에서 판매하기 위한 이커머스 물류 연동 통합 플랫폼 개발. 상품 등록부터 선적, 현지 매장 판매까지 QR 기반 물류 추적 및 통합관리 기능 구현",
        challenges: [
          {
            title: "SQL 튜닝과 인덱스를 활용한 상품 조회 성능 향상",
            problem: "LIKE 기반 검색에서 상품 수 증가 시 응답 속도 저하",
            solution:
              "ngram 기반 Full Text Index, 인덱스 최적화 및 쿼리 튜닝, 쿼리 리팩토링 및 실행계획(Execution Plan) 분석을 통한 SQL 튜닝",
            result: "상품 조회 속도 70% 이상 개선",
          },
          {
            title: "쿠폰 발급 동시성 이슈",
            problem: "트래픽 급증 시 쿠폰 중복 발급 및 Race Condition 발생",
            solution:
              "단일 서버에 대하여 synchronized로 동시성 이슈 해결, 추후 분산 서버를 대비한 DB Lock 방식으로 확장성 있게 설계",
            result: "쿠폰 발급 프로세스의 안정성 확보와 중복 발급 완전 차단으로 사용자 신뢰도 및 서비스 품질 제고",
          },
          {
            title: "국내 데이터와 베트남 데이터 싱크 마이그레이션",
            problem: "국내 DB(상품 등록 중심)와 베트남 DB(재고/판매 중심) 간 데이터 정합성 유지 필요",
            solution:
              "MySQL 간 Batch 기반 배치 동기화 파이프라인을 구축하여, 정기적이고 선별적인 양방향 데이터 동기화를 수행",
            result: "국내-베트남 DB 간 정기적 데이터 일치 보장",
          },
        ],
      },
    },
  ]

  const activities = [
    {
      name: "오픈소스 기여 멘토링",
      role: "운영진",
      period: "2025.05 - 진행중",
      description: [
        "김인제 멘토의 오픈소스 멘토링 8기부터 꾸준히 운영진으로 활동.",
        "현재까지 약 500명 이상의 멘티들에 대하여, 오픈소스 기여 가이드 제공 및 서포트.",
        "Apache Iceberg, Spring Kafka 등 여러 오픈소스에 적극 기여.",
      ],
    },
    {
      name: "IT 자격증 취득 단기 스터디",
      role: "운영진",
      period: "2024.12 - 2025.01",
      description: ["IT 자격증 취득을 위한 스터디를 운영 (10명 참여).", "활동 기간중, 리눅스 마스터 2급 자격증 취득."],
    },
    {
      name: "ROTC 57기 총동기회",
      role: "사무총장",
      period: "2021.09 - 진행중",
      description: [
        "대한민국 ROTC 총동문회의 여러 활동 적극 참여.",
        "전국 각지의 ROTC 네트워크 확보를 위한 활동 주도.",
      ],
    },
  ]

  const certifications = [
    { name: "리눅스 마스터 2급", date: "2025.01", issuer: "한국정보통신진흥협회" },
    { name: "정보처리기사", date: "2023.11", issuer: "한국산업인력공단" },
  ]

  const education = [
    {
      school: "방송통신대학교",
      degree: "컴퓨터과학과",
      period: "2024.03 - 재학중",
      description: "",
    },
    {
      school: "강남대학교",
      degree: "국어국문학과",
      period: "2015.03 - 2019.02",
      description: "졸업",
    },
  ]

  const military = {
    service: "대한민국 육군",
    rank: "중위 만기 전역",
    period: "2019.03 - 2021.06",
    description: "소대장 (ROTC 57기)",
  }

  function ProjectCard({ project }: { project: any }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs w-fit bg-blue-50 border-blue-200 text-blue-700">
                  {project.company}
                </Badge>
                <Badge variant="outline" className="text-xs w-fit bg-green-50 border-green-200 text-green-700">
                  {project.period}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <span className="font-medium text-purple-600">역할:</span> {project.role}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-amber-600">환경:</span> {project.environment}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="ml-4 flex-shrink-0">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

          <div className="mb-4">
            <p className="text-sm font-medium text-indigo-600 mb-2">기술 스택</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string, techIndex: number) => (
                <Badge
                  key={techIndex}
                  variant="secondary"
                  className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 text-slate-700 hover:from-slate-200 hover:to-slate-300 transition-all duration-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-1 mb-4">
            <p className="text-sm font-medium">주요 성과:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {project.achievements.map((achievement: string, achIndex: number) => (
                <li key={achIndex} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {isExpanded && project.details && (
            <div className="mt-6 pt-4 border-t space-y-6 animate-fade-in">
              <div>
                <h4 className="font-semibold text-sm mb-2">프로젝트 배경 및 목표</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.details.background}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3">기술적 도전과 해결</h4>
                <div className="space-y-4">
                  {project.details.challenges.map((challenge: any, challengeIndex: number) => (
                    <div key={challengeIndex} className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-sm mb-2 text-primary">{challenge.title}</h5>

                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="font-medium text-red-600">문제:</span>
                          <p className="mt-1 text-muted-foreground leading-relaxed">{challenge.problem}</p>
                        </div>

                        <div>
                          <span className="font-medium text-blue-600">해결:</span>
                          <p className="mt-1 text-muted-foreground leading-relaxed">{challenge.solution}</p>
                        </div>

                        <div>
                          <span className="font-medium text-green-600">결과:</span>
                          <p className="mt-1 text-muted-foreground leading-relaxed">{challenge.result}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* 프로필 섹션 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* 프로필 사진 */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary/40 transition-colors duration-300">
                  <Image
                    src="/daehong-profile.jpg"
                    alt="전대홍 프로필 사진"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 기본 정보 */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">전대홍</h1>
                <p className="text-xl text-muted-foreground mb-4">소프트웨어 개발자 / 데이터 엔지니어</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm break-all">daehong770@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">010-6275-2889</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">용인, 대한민국</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">경력 3년</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground space-y-4 leading-relaxed text-left">
                  <p>
                    소프트웨어 엔지니어이자, 데이터 엔지니어입니다. 금융, 이커머스 도메인에서 근무한 경험이 있으며,
                    Hadoop부터 클라우드 환경까지 폭넓은 경험을 가진 엔지니어로, Spark와 Iceberg 기반의 대규모 배치
                    파이프라인 설계 및 운영에 강점을 가지고 있습니다.
                  </p>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">주요 업무 경험</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>수십 ~ 수백 TB 이상의 데이터 처리 환경 구축 / 운영 경험 보유</li>
                      <li>Spark · 클라우드 기반의 ETL 배치 솔루션 설계 및 개발</li>
                      <li>Hadoop 기반의 레거시 솔루션 유지보수 및 성능 최적화</li>
                      <li>서비스 이중화, Failover 관리 및 Lock 을 통한 동시성 제어</li>
                    </ul>
                  </div>

                  <p>
                    최신 기술 트렌드에 꾸준한 관심을 가지고 있으며, 오픈소스 기여와 사내 기술 확산 활동에도 적극적으로
                    참여하고 있습니다. Apache Iceberg, Spring Kafka 등 다양한 오픈소스 프로젝트에 주기적으로 기여하고
                    있으며, 특히 Apache Iceberg의 기술 트렌드를 빠르게 파악하고 학습하여, 사내 기술 세션을 주도하였으며,
                    신규 데이터 솔루션에 Iceberg 도입을 직접 기획하고 설득하여 실제 도입까지 이끌어낸 경험이 있습니다.
                  </p>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">서비스 및 성능 개선 경험</h4>
                    <div className="space-y-2">
                      <div>
                        <h5 className="font-medium text-foreground/90">대용량 데이터 처리 최적화</h5>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                          <li>Spark · Hive 를 통한 데이터 처리 성능 3배 이상 향상</li>
                          <li>프로세스 개선을 통한, 집계 작업 처리 속도 개선</li>
                          <li>Iceberg 도입을 통한, 서비스 안정성 향상</li>
                          <li>DuckDB 도입을 통한 데이터 조회 성능 향상</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground/90">SQL 성능 최적화</h5>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                          <li>인덱스와 쿼리 튜닝을 통한, 사용자의 상품 검색 조회 성능 향상</li>
                          <li>데이터 스키마 정규화 및 불필요한 컬럼 제거를 통한 쿼리 처리 경량화</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">엔지니어로서의 목표</h4>
                    <ul className="list-decimal list-inside space-y-1">
                      <li>
                        오픈소스 기여와 최신 기술 트렌드에 대한 지속적인 관심을 바탕으로, 조직 내 기술 공유와 함께
                        성장하는 문화를 형성하고, 회사의 실질적인 기술 경쟁력과 비즈니스 가치로 연결할 수 있는
                        엔지니어가 되는 것을 목표로 합니다.
                      </li>
                      <li>
                        대용량 데이터와 높은 트래픽 환경에서도 안정적으로 서비스할 수 있는 아키텍처를 설계하고 개발하는
                        엔지니어가 되는 것을 목표로 합니다.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 핵심 기술 스택 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-primary" />
              <span>핵심 기술 스택</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {coreSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src={skill.logo || "/placeholder.svg"}
                    alt={`${skill.name} logo`}
                    width={40}
                    height={40}
                    className="mb-2 h-10 w-10 object-contain"
                  />
                  <span className="font-medium text-sm text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 경력사항 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <span>경력사항</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-2 border-primary pl-6">
                  <h3 className="font-semibold text-lg">{exp.company}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <p className="text-primary font-medium">
                      {exp.team} · {exp.position}
                    </p>
                    <span className="text-muted-foreground font-normal text-sm">· {exp.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.role} · {exp.period}
                  </p>
                  <p className="mb-3">{exp.description}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">주요 성과:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 오픈소스 기여 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-primary" />
              <span>오픈소스 기여</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {openSourceContributions.map((project, index) => (
                <div key={index} className="border-l-2 border-primary pl-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <Badge variant="secondary">{project.contributions}</Badge>
                  </div>
                  <p className="text-primary font-medium mb-1">{project.role}</p>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">기여 내역:</p>
                    {project.prs.map((pr, prIndex) => (
                      <Link
                        key={prIndex}
                        href={pr.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
                              <div className="flex items-center space-x-2">
                                <GitPullRequest className="h-4 w-4 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="font-medium text-sm group-hover:text-primary transition-colors">
                                  {pr.title}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs w-fit group-hover:border-primary transition-colors"
                              >
                                {pr.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
                              {pr.description}
                            </p>
                          </div>
                          <ExternalLink className="h-4 w-4 ml-2 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 주요 프로젝트 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>주요 프로젝트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 활동사항 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>활동사항</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-lg">{activity.name}</h3>
                  <p className="text-primary font-medium">{activity.role}</p>
                  <p className="text-sm text-muted-foreground">{activity.period}</p>
                  {Array.isArray(activity.description) ? (
                    <ul className="mt-2 text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      {activity.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">{activity.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 자격증 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>자격증</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-muted/50 gap-2"
                >
                  <div>
                    <span className="font-medium">{cert.name}</span>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {cert.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 학력사항 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>학력사항</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-lg">{edu.school}</h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 병역사항 */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>병역사항</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-semibold text-lg">{military.rank}</h3>
              <p className="text-primary font-medium">{military.service}</p>
              <p className="text-sm text-muted-foreground">{military.period}</p>
              <p className="mt-2 text-sm">{military.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
