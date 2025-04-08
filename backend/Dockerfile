# Use the Eclipse Temurin alpine image (Java 21)
FROM eclipse-temurin:21-jdk-alpine

# Create and change to the app directory
WORKDIR /app

# Copy everything into the container
COPY . ./

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw -DoutputFile=target/mvn-dependency-list.log -B -DskipTests clean dependency:list install

# Run the app by dynamically finding the JAR file in the target directory
CMD ["sh", "-c", "java -jar target/*.jar"]
