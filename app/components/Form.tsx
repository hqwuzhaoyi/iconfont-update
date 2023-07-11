'use client';
import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { CardWithForm } from './steps/Create';
import { Code } from './steps/Code';
import { DiffResult } from 'simple-git';

const iconTypeArr = [
  { title: 'sdata_office_UI', value: 'iconOffice' },
  { title: '所有图标', value: 'iconOrigin' },
  { title: '设计态应用图标', value: 'iconOfficeV2' },
  { title: '移动端图标', value: 'iconForMobile' },
  { title: 'SRUi-V3', value: 'SRUi-V3' },
  { title: 'Sr-双色图标', value: 'SrBicolorIcon' },
  { title: 'SR-图标库-双色', value: 'SRLib-Bicolor' },
  { title: 'SR-图标库-线性', value: 'SRLib-Line' },
  { title: 'SR-图标库-面性', value: 'SRLib-Surface' },
  { title: 'SR-baseicon', value: 'SRUi-Base' },
  { title: 'SR-coloricon', value: 'SRUi-Color' },
];

const formSchema = z.object({
  branch: z.string().min(5, {
    message: '请输入.',
  }),
  code: z.string().min(5, {
    message: '请输入.',
  }),
  project: z.string({
    required_error: '请选择图标库.',
  }),
});

export type FormInterface = z.infer<typeof formSchema>;

export type ResultType = {
  result: {
    diff: {
      oldCode: string;
      newCode: string;
    };
    summary: DiffResult;
  };
};

export default function FormPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [diffJson, setDiffJson] = React.useState<ResultType>({
    result: {
      diff: {
        oldCode: '-- a/parseToQbit.ts',
        newCode: '++ b/parseToQbit.ts\n123',
      },
      summary: {
        changed: 1,
        deletions: 0,
        insertions: 1,
        files: [
          {
            file: 'parseToQbit.ts',
            changes: 1,
            insertions: 1,
            deletions: 0,
            binary: false,
          },
        ],
      },
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    let url = new URL('http://localhost:3000/api');
    let params: any = values;
    let keysToAdd = ['branch', 'code', 'project'];

    keysToAdd.forEach((key) => {
      if (params.hasOwnProperty(key)) {
        url.searchParams.append(key, params[key]);
      }
    });

    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json: ResultType) => setDiffJson(json))
      .catch((err) => console.log('Request Failed', err));
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>更新图标库</CardTitle>
              <CardDescription>请输入全部内容更新图标</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input id="branch" placeholder="分支名" {...field} />
                    </FormControl>
                    <FormDescription>请输入你的分支号</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input id="code" placeholder="更新码" {...field} />
                    </FormControl>
                    <FormDescription>请输入你的github更新码</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>project</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择图标库" />
                            <SelectContent position="popper">
                              {iconTypeArr.map(({ title, value }) => (
                                <SelectItem value={value} key={value}>
                                  {title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </SelectTrigger>
                        </FormControl>
                      </Select>
                    </FormControl>
                    <FormDescription>请选择图标库</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline">取消</Button>
              <Button type="submit">提交</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {diffJson && <Code diffJson={diffJson} />}
    </main>
  );
}
