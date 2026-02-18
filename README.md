# Frontend Dashboard TMG

Menggunakan Next JS, Shadcn dengan Redux Toolkit manajemen state

## Packages

## Environment Variables

Untuk menjalankan proyek ini, Anda perlu menambahkan variabel environment berikut ke file .env

```bash
HOSTNAME="0.0.0.0"
PORT=3000
NODE_ENV=production

# Open Telemetry
OTEL_SERVICE_NAME="frontend-dashboard-tmg"
OTEL_EXPORTER_OTLP_ENDPOINT="http://signoz-otel-collector:4318"
OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
OTEL_TRACES_SAMPLER="parentbased_traceidratio"
# On development ARG = 1
OTEL_TRACES_SAMPLER_ARG=0.2

# Backend
BACKEND_BASE_URL="http://localhost:8088"
BACKEND_BASE_PATH="api"
BACKEND_VERSION="v1"

# Token JWT
ACCESS_TOKEN_TTL_SECONDS=10
```

## Installation

Setelah kloning berhasil silahkan untuk masuk ke folder root aplikasi dan lakukan perintah sebagai berikut.

```bash
pnpm install
```

## Run Locally

Kloning proyek from SCM Bank Mega

```bash
  git clone https://scm.bankmegadev.com/cobs/corporate-system/dashboard-tmg/frontend-dashboard-tmg.git
```

Arahkan ke folder aplikasi

```bash
  cd frontend-dashboard-tmg
```

Install package dependencies

```bash
$ frontend-dashboard-tmg/ pnpm install
```

## Run Locally using Docker

Sebelum mengikuti ini diharapkan pada komputer terdapat [Docker Desktop](https://www.docker.com/Contracts/docker-desktop/) yang telah terinstall [docker-compose](https://docs.docker.com/compose/install/) didalamnya.

Kloning proyek

```bash
  git clone https://scm.bankmegadev.com/cobs/corporate-system/dashboard-tmg/frontend-dashboard-tmg.git
```

Arahkan ke folder aplikasi

```bash
  cd frontend-dashboard-tmg
```

Bangun image docker aplikasi dan mulaikan image.

```bash
frontend-dashboard-tmg/ docker-compose up --build -d
```

Untuk melihat logs pada aplikasi

```bash
frontend-dashboard-tmg/ docker logs -f --tail 100 <nama-image-aplikasi>
```

## Authors

- [@yusuf.putra](https://scm.bankmega.local/yusuf.putra)
- [@corsys-yusuf](https://github.com/corsys-yusuf)

## Contributing

Untuk bergabung dalam kontribusi pengembangan aplikasi ini dapat mengabari admin untuk ditambahkan dalam pengguna yang dapat mengakses proyek.

## License

[GNU AGPL 3.0](https://choosealicense.com/licenses/agpl-3.0/)
