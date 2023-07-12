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
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { CardWithForm } from './steps/Create';
import { Code } from './steps/Code';
import { DiffResult, PushResult } from 'simple-git';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

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
  branch: z
    .string()
    .min(5, {
      message: '不能少于5个字符',
    })
    .refine((val) => val !== 'master', {
      message: '分支不能为master',
    }),
  code: z.string().min(5, {
    message: '不能少于5个字符',
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

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center [&>div]:w-full',
        className,
      )}
      {...props}
    />
  );
}

export default function FormPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const [diffJson, setDiffJson] = React.useState<ResultType>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    let url = new URL('/api');
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

  function handleMergeRequest() {
    const values = form.getValues();
    let url = new URL('/push/api');
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
      .then((json: PushResult) => {
        toast({
          title: 'Merge Request',
          description: (
            <Button
              variant="link"
              onClick={() => {
                window.open(json.remoteMessages.pullRequestUrl);
              }}
            >
              Link
            </Button>
          ),
        });
        setDiffJson(undefined);
      })
      .catch((err) => {
        console.log('Request Failed', err);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: '发起合并失败.',
        });
      });
  }

  return (
    <div className="rounded-[0.5rem] border bg-background shadow">
      <div className="flex items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <DemoContainer>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                            <Input
                              id="branch"
                              placeholder="分支名"
                              {...field}
                            />
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
                          <FormDescription>
                            请输入你的github更新码
                          </FormDescription>
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
          </DemoContainer>
        </div>
        <div className="col-span-4 grid items-start gap-6 lg:col-span-2">
          <DemoContainer>
            <Card>
              <CardHeader>
                <CardTitle>Git Diff</CardTitle>
                <CardDescription>请确认你的更新内容是否正确</CardDescription>
              </CardHeader>
              <CardContent>
                {diffJson && (
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="outline">确认合并</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>确认无误?</DialogTitle>
                        <DialogDescription>
                          请确认你的更新内容是否正确，确认后将会发起Merge
                          Request合并到master分支
                          <div className="flex justify-end mt-4">
                            <Button type="submit" onClick={handleMergeRequest}>
                              发起合并
                            </Button>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )}
                {diffJson && <Code diffJson={diffJson} />}
              </CardContent>
            </Card>
          </DemoContainer>
        </div>
      </div>
    </div>
  );
}
