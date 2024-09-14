# Backend for the case study
Simple backend for the case study.
You are free to make your own if you prefer.

## API
The API exposes two models:
* dimensions
* indicators

## Usage
### Native
You will need Poetry and Python installed.

Install the backend with: `poetry install`

Then run it with: `poetry run uvicorn --workers=1 backend.main:app --reload --port 8080`

### Docker
```shell
# Build the test
./docker_build.sh

# Run the test
./docker_run.sh
```

Then, you can access the [Swagger UI](http://localhost:8080/docs) from your browser.
