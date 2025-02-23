"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { DivinationResult, FormValues } from "./types"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  lowerTrigram: z.string().min(1, "请输入下卦"),
  upperTrigram: z.string().min(1, "请输入上卦"),
  changingLine: z.string().min(1, "请输入变爻"),
})

const TABLE_64 = [
  [2, 12, 45, 35, 16, 20, 8, 23],
  [11, 1, 43, 14, 34, 9, 5, 26],
  [19, 10, 58, 38, 54, 61, 60, 41],
  [36, 13, 49, 30, 55, 37, 63, 22],
  [24, 25, 17, 21, 51, 42, 3, 27],
  [46, 44, 28, 50, 32, 57, 48, 18],
  [7, 6, 47, 64, 40, 59, 29, 4],
  [15, 33, 31, 56, 62, 53, 39, 52],
]

const DUOSIT_MAPPING: Record<number, string> = {
  1: "䷀  乾",
  2: "䷁  坤",
  3: "䷂  屯",
  4: "䷃  蒙",
  5: "䷄  需",
  6: "䷅  訟",
  7: "䷆  師",
  8: "䷇  比",
  9: "䷈  小畜",
  10: "䷉  履",
  11: "䷊  泰",
  12: "䷋  否",
  13: "䷌  同人",
  14: "䷍  大有",
  15: "䷎  謙",
  16: "䷏  豫",
  17: "䷐  隨",
  18: "䷑  蠱",
  19: "䷒  臨",
  20: "䷓  觀",
  21: "䷔  噬嗑",
  22: "䷕  賁",
  23: "䷖  剝",
  24: "䷗  復",
  25: "䷘  無妄",
  26: "䷙  大畜",
  27: "䷚  頤",
  28: "䷛  大過",
  29: "䷜  坎",
  30: "䷝  離",
  31: "䷞  咸",
  32: "䷟  恆",
  33: "䷠  遯",
  34: "䷡  大壯",
  35: "䷢  晉",
  36: "䷣  明夷",
  37: "䷤  家人",
  38: "䷥  睽",
  39: "䷦  蹇",
  40: "䷧  解",
  41: "䷨  損",
  42: "䷩  益",
  43: "䷪  夬",
  44: "䷫  姤",
  45: "䷬  萃",
  46: "䷭  升",
  47: "䷮  困",
  48: "䷯  井",
  49: "䷰  革",
  50: "䷱  鼎",
  51: "䷲  震",
  52: "䷳  艮",
  53: "䷴  漸",
  54: "䷵  歸妹",
  55: "䷶  豐",
  56: "䷷  旅",
  57: "䷸  巽",
  58: "䷹  兌",
  59: "䷺  渙",
  60: "䷻  節",
  61: "䷼  中孚",
  62: "䷽  小過",
  63: "䷾  既濟",
  64: "䷿  未濟",
}

const SIT_MAPPING: Record<number, string> = {
  0: "坤  ☷",
  1: "乾  ☰",
  2: "兑  ☱",
  3: "离  ☲",
  4: "震  ☳",
  5: "巽  ☴",
  6: "坎  ☵",
  7: "艮  ☶",
}

const PHASE_MAPPING: Record<number, string> = {
  0: "上",
  1: "初",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
}

export default function DivinationCalculator() {
  const [result, setResult] = useState<DivinationResult | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lowerTrigram: "",
      upperTrigram: "",
      changingLine: "",
    },
  })

  function onSubmit(values: FormValues) {
    const downSit = Number.parseInt(values.lowerTrigram) % 8
    const upSit = Number.parseInt(values.upperTrigram) % 8
    const changingLine = Number.parseInt(values.changingLine) % 6

    const resultA = SIT_MAPPING[downSit]
    const resultB = SIT_MAPPING[upSit]
    const resultC = PHASE_MAPPING[changingLine]
    const sit64 = TABLE_64[downSit][upSit]
    const sitName = DUOSIT_MAPPING[sit64]

    setResult({
      upperTrigram: resultB,
      lowerTrigram: resultA,
      changingLine: resultC,
      hexagramNumber: sit64,
      hexagramName: sitName,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">数字占卜</CardTitle>
          <CardDescription className="text-center">输入数字获取卦象</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="lowerTrigram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>下卦</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input type="number" placeholder="输入数字" {...field} />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => field.onChange(Math.floor(Math.random() * 900 + 100).toString())}
                        >
                          随机
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="upperTrigram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>上卦</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input type="number" placeholder="输入数字" {...field} />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => field.onChange(Math.floor(Math.random() * 900 + 100).toString())}
                        >
                          随机
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="changingLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>变爻</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input type="number" placeholder="输入数字" {...field} />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => field.onChange(Math.floor(Math.random() * 900 + 100).toString())}
                        >
                          随机
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                占卜
              </Button>
            </form>
          </Form>

          {result && (
            <div className="mt-8 grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <p>上卦: {result.upperTrigram}</p>
                <p>下卦: {result.lowerTrigram}</p>
                <p>变爻: {result.changingLine}</p>
              </div>
              <div className="space-y-2">
                <p>卦序：{result.hexagramNumber}</p>
                <p>卦名：{result.hexagramName}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

