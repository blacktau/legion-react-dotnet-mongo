#!/bin/env sh
chcon -R system_u:object_r:container_file_t:s0 ./Data
chcon -R system_u:object_r:container_file_t:s0 ./Home
chcon -R system_u:object_r:container_file_t:s0 ./Init
