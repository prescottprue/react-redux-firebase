workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["Create Release"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Check For Lint" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "lint"
}

action "Test" {
  needs = "Check For Lint"
  uses = "actions/npm@master"
  args = "test:cov"
}

# Filter for a new tag
action "Tag" {
  needs = "Test"
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}

action "Create Release" {
  needs = "Publish"
  uses = "elgohr/Github-Release-Action@master"
  args = "MyReleaseMessage"
  secrets = ["GITHUB_TOKEN"]
}
