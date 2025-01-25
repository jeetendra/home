provider "aws" {
  region = "ap-south-1"
}

data "archive_file" "lambda" {
  type = "zip"
  source_file = "index.js"
  output_path = "lambda.zip"
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"
    principals {
      type = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = [ "sts:AssumeRole" ]
  }
}


resource "aws_iam_role" "lambda_role" {
    name = "my-lambda-role"
    assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


resource "aws_lambda_function" "lambda" {
  filename = data.archive_file.lambda.output_path
  function_name = "lambda-function"
  role = aws_iam_role.lambda_role.arn
  handler = "index.handler"

  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime = "nodejs18.x"
}

resource "aws_lambda_function_url" "lambda" {
  function_name = aws_lambda_function.lambda.function_name
  authorization_type = "NONE"
}

output "function_url" {
  value = aws_lambda_function_url.lambda.function_url
}