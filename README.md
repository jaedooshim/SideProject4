# 1Day-1Project

## BackEnd - 심재두

## #프로젝트 소개
- 1D-1Project : 하루에 3~4개의 테이블로 구성하여 사이드 프로젝트를 진행
- 멤버/이메일검증 으로 구성되어 있으며, 멤버의 token값을 받아 해당하는 멤버가드에 의해 요청이 처리됨.
- 멤버가 생성이 되면 is_valid_email 필드는 boolean 타입으로 default:false 로 설정되어있음. 그리고나서 메일인증을 통해 is_valid_email 필드가 true로 업데이트됨.
- 메일인증을 요청하고 임의로 생성하는 verify_code의 무작위 스트링값과 요청시 쿼리로 보내는 code의 값이 일치하면 인증 성공, 그리고 설정된 유효시간이 지날시에는 다시 요청을하여 인증진행

## Rest API
| Content   | Method   | Path         |
|-----------|----------|--------------|
| 멤버생성      | `POST`   | /members     |
| 멤버조회      | `GET`    | /members/:id |
| 멤버 목록조회   | `GET`    | /members     |
| 멤버삭제      | `DELETE` | /members/:id |
| 메일 인증코드요청 | `POST`   | /mail        |
| 메일 인증요청   | `GET`    | /mail/verify |

### 사용기술

- TypeScript
- NestJs
- Prisma
- PostgreSQL
- Docker



### Server Use

```bash
npm run start:dev
```

### Install
```angular2html
npm i | npm install
```

### Docker PostgreServer Port
```angular2html
5432:5432
```