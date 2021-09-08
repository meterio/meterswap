#!/bin/bash

# build
yarn build

# copy dist to mainnet S3
aws s3 sync ./build/ s3://voltswap/ --delete --acl public-read

# invalidate mainnet cloudfront cache
aws cloudfront create-invalidation --distribution-id EEAS9O6ETEBUC --paths "/*"

