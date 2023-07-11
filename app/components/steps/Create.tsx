import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>更新图标库</CardTitle>
        <CardDescription>请输入全部内容更新图标</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Branch</Label>
              <Input id="branch" placeholder="分支名" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">code</Label>
              <Input id="name" placeholder="iconfont 更新码" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Project</Label>
              <Select>
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
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">取消</Button>
        <Button>提交</Button>
      </CardFooter>
    </Card>
  );
}
