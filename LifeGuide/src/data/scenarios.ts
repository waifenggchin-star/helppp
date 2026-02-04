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
    title: '医院挂号 (演示)',
    category: 'medical',
    icon: 'stethoscope',
    encouragement: '这是一个演示用的静态数据。',
    steps: [
      {
        id: 'h1',
        action: '第一步：打开手机',
        description: '请在手机上找到“微信”或“支付宝”。',
        imagePlaceholder: '手机图标',
        flashCard: {
          title: '求助',
          content: '请帮我找一下微信。'
        }
      }
    ]
  },
  {
    id: 'transport_mock',
    title: '交通出行 (演示)',
    category: 'transport',
    icon: 'train',
    encouragement: '出行请注意安全。',
    steps: [
      {
        id: 't1',
        action: '刷码进站',
        description: '打开乘车码，对准闸机。',
        imagePlaceholder: '闸机图标'
      }
    ]
  },
  {
    id: 'docs_mock',
    title: '证件办理 (演示)',
    category: 'docs',
    icon: 'id-card',
    encouragement: '请带好户口本。',
    steps: [
      {
        id: 'd1',
        action: '前往派出所',
        description: '去最近的户籍派出所。',
        imagePlaceholder: '派出所图标'
      }
    ]
  },
  {
    id: 'daily_mock',
    title: '办事指南 (演示)',
    category: 'daily',
    icon: 'sun',
    encouragement: '生活小助手。',
    steps: [
      {
        id: 'da1',
        action: '开始办事',
        description: '准备好相关材料。',
        imagePlaceholder: '材料图标'
      }
    ]
  }
];
