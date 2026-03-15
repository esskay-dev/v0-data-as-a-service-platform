"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  FileUp,
  X,
  CheckCircle2,
  AlertCircle,
  FileJson,
  FileSpreadsheet,
  File,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type UploadStep = "upload" | "configure" | "validate" | "complete"

interface DetectedSchema {
  name: string
  type: string
  nullable: boolean
}

const sampleSchema: DetectedSchema[] = [
  { name: "id", type: "string", nullable: false },
  { name: "customer_name", type: "string", nullable: false },
  { name: "email", type: "string", nullable: true },
  { name: "amount", type: "number", nullable: false },
  { name: "transaction_date", type: "datetime", nullable: false },
  { name: "status", type: "string", nullable: false },
]

const validationResults = [
  { check: "Schema Detection", status: "passed", message: "6 columns detected" },
  { check: "Data Types", status: "passed", message: "All types validated" },
  { check: "Null Values", status: "warning", message: "12 null values in 'email' column" },
  { check: "Duplicate Rows", status: "passed", message: "No duplicates found" },
  { check: "Format Consistency", status: "passed", message: "All dates in ISO format" },
]

export default function UploadPage() {
  const router = useRouter()
  const [step, setStep] = useState<UploadStep>("upload")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [datasetName, setDatasetName] = useState("")
  const [description, setDescription] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }, [])

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setDatasetName(selectedFile.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, "_"))
    
    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStep("configure")
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }

  const handleConfigure = () => {
    if (!datasetName.trim()) {
      toast.error("Please enter a dataset name")
      return
    }
    setStep("validate")
    setIsProcessing(true)
    
    // Simulate validation
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  const handlePublish = () => {
    setStep("complete")
    toast.success("Dataset published successfully!")
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    switch (ext) {
      case "json":
        return <FileJson className="h-8 w-8 text-amber-500" />
      case "csv":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      default:
        return <File className="h-8 w-8 text-muted-foreground" />
    }
  }

  const removeFile = () => {
    setFile(null)
    setStep("upload")
    setUploadProgress(0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Dataset</h1>
        <p className="text-muted-foreground">
          Upload a file to create a new dataset with automatic API generation
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {["upload", "configure", "validate", "complete"].map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : ["upload", "configure", "validate", "complete"].indexOf(step) > i
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && (
              <div
                className={`w-12 h-0.5 ${
                  ["upload", "configure", "validate", "complete"].indexOf(step) > i
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle>Select File</CardTitle>
            <CardDescription>
              Drag and drop a file or click to browse. Supported formats: CSV, JSON, Parquet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Drop your file here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <input
                  type="file"
                  accept=".csv,.json,.parquet"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FileUp className="mr-2 h-4 w-4" />
                    Browse Files
                  </label>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 100MB
                </p>
              </div>
            </div>

            {file && uploadProgress < 100 && (
              <div className="mt-6 p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.name)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={removeFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={uploadProgress} className="mt-3 h-2" />
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Configure */}
      {step === "configure" && file && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Dataset Configuration</CardTitle>
              <CardDescription>
                Configure your dataset settings before publishing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="name">Dataset Name</FieldLabel>
                  <Input
                    id="name"
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                    placeholder="my_dataset"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your dataset..."
                    rows={3}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="visibility">Visibility</FieldLabel>
                  <Select defaultValue="private">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private - API key required</SelectItem>
                      <SelectItem value="public">Public - No authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>

              {/* File Info */}
              <div className="mt-6 p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.name)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Badge variant="secondary">Uploaded</Badge>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep("upload")}>
                  Back
                </Button>
                <Button onClick={handleConfigure} className="flex-1">
                  Continue to Validation
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Detected Schema
              </CardTitle>
              <CardDescription>
                Automatically detected column types from your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sampleSchema.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono">{col.name}</code>
                      {col.nullable && (
                        <Badge variant="outline" className="text-xs">nullable</Badge>
                      )}
                    </div>
                    <Badge variant="secondary">{col.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Validate */}
      {step === "validate" && (
        <Card>
          <CardHeader>
            <CardTitle>Data Validation</CardTitle>
            <CardDescription>
              Automatic quality checks and data validation results
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="py-12 text-center">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="mt-4 font-medium">Validating your data...</p>
                <p className="text-sm text-muted-foreground">
                  Running quality checks and schema validation
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {validationResults.map((result) => (
                    <div
                      key={result.check}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        {result.status === "passed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        )}
                        <div>
                          <p className="font-medium">{result.check}</p>
                          <p className="text-sm text-muted-foreground">{result.message}</p>
                        </div>
                      </div>
                      <Badge
                        variant={result.status === "passed" ? "secondary" : "outline"}
                        className={result.status === "warning" ? "text-amber-600" : ""}
                      >
                        {result.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        Validation Complete
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your dataset passed all critical checks and is ready to publish
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={() => setStep("configure")}>
                    Back
                  </Button>
                  <Button onClick={handlePublish} className="flex-1">
                    Publish Dataset
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 4: Complete */}
      {step === "complete" && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mt-4 text-2xl font-bold">Dataset Published!</h2>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                Your dataset is now live and accessible via the API. Use the endpoint below to start querying your data.
              </p>

              <div className="mt-6 p-4 rounded-lg bg-muted/50 max-w-xl mx-auto">
                <p className="text-sm text-muted-foreground mb-2">API Endpoint</p>
                <code className="text-sm font-mono break-all">
                  https://api.dataflow.io/v1/datasets/{datasetName}
                </code>
              </div>

              <div className="mt-8 flex gap-3 justify-center">
                <Button variant="outline" onClick={() => router.push("/dashboard/datasets")}>
                  View All Datasets
                </Button>
                <Button onClick={() => router.push("/dashboard/docs")}>
                  View API Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
