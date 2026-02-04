export interface Step {
  id: string;
  action: string;
  description?: string;
  imagePlaceholder: string;
  flashCard?: {
    title: string;
    content: string;
  };
}

export interface Scenario {
  id: string;
  title: string;
  category: 'transport' | 'medical' | 'docs' | 'daily';
  icon: string;
  encouragement: string;
  steps: Step[];
}

export const scenarios: Scenario[] = [
  {
    id: 'hospital_mock',
    title: '医院挂号',
    category: 'medical',
    icon: 'stethoscope',
    encouragement: '测试模式',
    steps: [
      {
        id: 'h1',
        action: '启动测试',
        description: '如果能看到这段文字，说明数据加载正常。',
        imagePlaceholder: '无'
      }
    ]
  }
];
