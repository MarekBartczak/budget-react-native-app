find . -type f -name '*js' >> ./__fileList
grep -v "node_modules" __fileList >> ./__InProject__
wc -l ./__InProject__ 
rm __fileList __InProject__
