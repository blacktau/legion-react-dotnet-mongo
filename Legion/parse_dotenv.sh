#!/usr/bin/env sh

export $(egrep -v '^#' ../.env | xargs)