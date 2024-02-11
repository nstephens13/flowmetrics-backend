### Building and running your application

You can build your application using the following command:

```s
docker build -t flowmetrics-backend .
```

After building the image, run the container with the following command:

```s
docker run -it -p 3000:3000 flowmetrics-backend
```

The application will be available at `http://localhost:3000`.
