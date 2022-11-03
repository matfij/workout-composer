if [[ "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  echo "Build cancelled"
  exit 0;
else
    echo "Build can proceed"
  exit 1;
fi
