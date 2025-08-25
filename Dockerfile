# Use Node.js Alpine base image for a small footprint
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Set environment variables needed at buildtime
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN

ENV SENTRY_ORG=$SENTRY_ORG \
    SENTRY_PROJECT=$SENTRY_PROJECT \
    SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

# Run the Next.js build (includes Sentry's source map upload)
RUN yarn build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set the correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to the non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variable for the port
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js app
CMD ["node", "server.js"]