export interface Step {
  id: string;
  action: string;
  description?: string;
  imagePlaceholder: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: 'medical';
  icon: string;
  encouragement: string;
  steps: Step[];
}

export const scenarios: Scenario[] = [
  {
    id: 'hospital_reg_cn',
    title: '医院挂号 (纯文字版)',
    category: 'medical',
    icon: 'stethoscope',
    encouragement: '测试模式：仅包含基础数据。',
    steps: [
      {
        id: 'h1',
        action: '手机预约挂号',
        description: '这是测试数据。如果不白屏，说明基础环境正常。',
        imagePlaceholder: '无图片'
      }
    ]
  }
];
