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
  featured: false,
  thumbnail: "/apache-gravitino-stability-improvements.png",
  bookmark: false,
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



<br>
## ✔(추가) 네 번째 기여에 성공하다.

블로그에 글을 작성하는 사이, 네 번째 기여에 대해 Merge 가 되었습니다.

해당 내용을 간단히 설명하면,

<br>
<div align="center">◈</div>
<br>

# ✏️ 3. 결론

Apache Iceberg 와 함께, 흥미가 생긴 또 하나의 Apache 프로젝트였습니다.

2024년 6월에 인큐베이팅 되고, 2025년 6월 3일에 Apache의 TLP에 합류하게 된 프로젝트다보니, 아직 기여를 하는 사람들이 많지 않고, 재미난 이슈들도 많이 나오고 있습니다.

처음 기여를 시작하는 사람들에게도 너무 좋을 거 같고, 저처럼 Contributor 를 넘어서 Maintainer 를 목표로 하는 사람들에게는 너무 좋은 프로젝트가 아닐까 싶습니다.

아무 프로젝트가 아닌, 꽤 앞으로 쓰일 수 있는 좋은 프로젝트라 생각되기에, 더 적극적으로 기여를 해보고자 합니다.

긴 글 읽어주셔서 감사합니다. :D

`

export default content
