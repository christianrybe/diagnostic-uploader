# diagnostic-uploader

## About The Project

This Express application is designed to handle uploads of large .tgz archives to AWS S3 using Multer. Multer provides asynchronous uploads and therefore multiple concurrent uploads are supported. It's dockerized for easy deployment and development, and integrates GitHub Actions for automated deployment to AWS Elastic Beanstalk. Using EB ensures automatic scaling if necessary.

Only correctly formed multipart requests with .tgz archives are accepted. 

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

The project uses TypeScript both for the production and testing code.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm
  ```bash
  npm install npm@latest -g
  ```
- Docker (optional, for Docker usage)
- AWS CLI (optional, for direct AWS interactions)

### Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/yourusername/yourprojectname.git
  ```

2. Navigate to the project directory and obtain a .env file for secrets to run the app locally:

  ```bash
  cd yourprojectname
  touch .env # Get the contents from a teammate
  ```

3. Set up husky

  ```bash
  npm run prepare
  ```

4. Install dependecies

  ```bash
  npm install
  ```

5. Start development server

  ```bash
  npm run dev
  ```

  It supports hot reloading, so whenever you save changes to a modified source file, the changes will automatically be picked up and updated in the running app.

6. Run tests

  ```bash
  npm run test
  ```

  Tests run using Jest.

7. OPTIONAL: Docker

  You might want to try and run Docker container locally in order to facilitate debugging if deployment of the Docker container fails on AWS EB.


  First build the image:
  ```bash
  docker build -t diagnostic-uploader .
  ```

  Next run the container:
  ```bash
  docker run -d -p 8000:8000 --env-file .env diagnostic-uploader
  ```

  Be sure to attach the `.env` file and expose a port.

### Deployment

This project is configured with GitHub Actions for continuous deployment to AWS Elastic Beanstalk on the Docker platform. On every push to the main branch, the application is automatically as a Docker container (see `Dockerfile`). 

## Production environment

The server is accessible at: [http://diagnostic-uploader.eu-north-1.elasticbeanstalk.com/](http://diagnostic-uploader.eu-north-1.elasticbeanstalk.com/)

### API

For the detailed response types see `src/types/api.ts` file. In essence the API returns either a data object if request completes successfully, e.g. for uploads:

  ```bash
  {
    "data": {
        "id": "2024-01-18T19:59:25.115Z-archive.tgz"
    }
  }
  ```

or an error object if the request completes abnormally:

```bash
  {
    "error": {
        "message": "Only .tgz files are accepted.",
        "code": 404
    }
  }
```

#### Health endpoint

You can hit [http://diagnostic-uploader.eu-north-1.elasticbeanstalk.com/health](http://diagnostic-uploader.eu-north-1.elasticbeanstalk.com/health) in the browser to quickly check if the app is up and running.

#### Archives

##### Uploading

```bash
POST http://diagnostic-uploader.eu-north-1.elasticbeanstalk.com/api/archive
```

This endpoint is idempotent and prepends a timestamp to guarantee uniqueness (could be replaced with a UUID, but with the current load timestamps are more readable).

Be sure to submit a multipart request (with appropriate headers) and attach a file, which is a .tgz archive. Otherwise the request will be rejected.

The name of the key should be **file**, see HTTP equivalent of a Postman request:

```bash
POST /api/archive HTTP/1.1
Host: diagnostic-uploader.eu-north-1.elasticbeanstalk.com
Content-Length: 199
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="archive.tgz"
Content-Type: <Content-Type header here>

(data)
------WebKitFormBoundary7MA4YWxkTrZu0gW--

```

Sample response (includes the key of the created resource):

```bash
  {
    "data": {
        "id": "2024-01-18T20:53:04.862Z-archive.tgz"
    }
}
```

##### Listing

```bash
GET http://diagnostic-uploader.eu-north-1.elasticbeanstalk.com/api/archive
```

As of now the results are not paginated, which should be improved asap.

Sample response:

```bash
{
    "data": {
        "files": [
            {
                "id": "2024-01-18T20:53:04.862Z-archive.tgz",
                "url": "https://diagnostics-and-easy-to-remember-string.s3.amazonaws.com/2024-01-18T20:53:04.862Z-archive.tgz"
            }
        ]
    }
}
```

### Observability

Basic monitoring is provided out of the box inside AWS console and EB console. It provides metrics, logs and alerts, although no alerts have been set up as of now.

## Future improvements

The features below have been skipped due to time constraints and it would be beneficial to implement them.

- Include Swagger for live API documentation.
- Add E2E tests to really verify that a file is successfully uploaded to S3
- Adding s3-mock for unit & integration tests
- Adding Sentry for easy error tracking
- Using vaults for more secure secrets storage in environments
- Implementing appropriate roles and ACLs in AWS for better security
- Adding authorisation
- More granular deployment workflow; if there are more users working on the project then also adding pre-PR verification
- Env var (config) verification on startup and providing a config with no undefined values
- Add pagination for the returned list of uploads
- Alerting when the app is down, not responding, overloaded, etc

