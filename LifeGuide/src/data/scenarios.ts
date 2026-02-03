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
    id: 'subway',
    title: '怎么坐地铁',
    category: 'transport',
    icon: 'train',
    encouragement: '地铁其实很简单，跟着指示牌走，慢一点也没关系。',
    steps: [
      {
        id: 's1',
        action: '找到进站口',
        description: '寻找带有地铁标志的入口，通常有楼梯或扶梯向下。',
        imagePlaceholder: '地铁站入口照片，带有明显的地铁Logo',
      },
      {
        id: 's2',
        action: '通过安检',
        description: '把包包放在传送带上，人走过安检门。手里拿的水可能需要喝一口。',
        imagePlaceholder: '安检机和安检人员的照片',
      },
      {
        id: 's3',
        action: '购买车票/刷卡进站',
        description: '如果有交通卡或手机NFC，直接在闸机刷卡。如果没有，去自动售票机买票。',
        imagePlaceholder: '自动售票机和闸机刷卡区域的照片',
        flashCard: {
          title: '询问购票',
          content: '您好，我没有交通卡，请问在哪里买单程票？'
        }
      },
      {
        id: 's4',
        action: '确认方向并候车',
        description: '看清站台屏蔽门上方的线路图，确认你要去的方向。',
        imagePlaceholder: '站台线路图和候车黄线的照片',
        flashCard: {
          title: '询问方向',
          content: '您好，请问去[目的地]是在这侧坐车吗？'
        }
      }
    ]
  },
  {
    id: 'hospital_first',
    title: '第一次去医院',
    category: 'medical',
    icon: 'stethoscope',
    encouragement: '生病了去医院很正常，医生是来帮助你的，不用害怕。',
    steps: [
      {
        id: 'h1',
        action: '办理就诊卡/建档',
        description: '如果是第一次来这家医院，通常需要先在自助机或窗口办一张就诊卡。',
        imagePlaceholder: '医院自助办卡机的照片',
        flashCard: {
          title: '询问建档',
          content: '您好，我是第一次来，请问在哪里办就诊卡？'
        }
      },
      {
        id: 'h2',
        action: '挂号',
        description: '选择你要看的科室（如感冒挂呼吸内科，牙疼挂口腔科）。',
        imagePlaceholder: '挂号窗口或自助挂号界面的照片',
      },
      {
        id: 'h3',
        action: '前往诊区报到',
        description: '看挂号单上的地址，找到对应的科室，在护士台或机器上“报到”排队。',
        imagePlaceholder: '科室候诊区和分诊台的照片',
        flashCard: {
          title: '询问分诊',
          content: '您好，我挂了号，请问在哪里报到候诊？'
        }
      },
      {
        id: 'h4',
        action: '等待叫号就诊',
        description: '盯着屏幕或听广播，叫到名字再进去。',
        imagePlaceholder: '候诊区叫号屏幕的照片',
      }
    ]
  },
  {
    id: 'id_card',
    title: '办理身份证',
    category: 'docs',
    icon: 'id-card',
    encouragement: '办证件是成长的标志，工作人员会指引你，带好材料就行。',
    steps: [
      {
        id: 'd1',
        action: '准备材料',
        description: '通常需要户口本原件。如果是异地办理，可能需要居住证或学生证。',
        imagePlaceholder: '户口本和证件照回执的照片',
      },
      {
        id: 'd2',
        action: '前往派出所/办证大厅',
        description: '去户籍所在地或居住地的派出所户籍科。',
        imagePlaceholder: '派出所户籍室门口的照片',
        flashCard: {
          title: '询问办理点',
          content: '您好，我想办理身份证，请问是这里吗？'
        }
      },
      {
        id: 'd3',
        action: '拍照和录指纹',
        description: '穿深色衣服，坐端正拍照。然后在机器上录入指纹。',
        imagePlaceholder: '身份证拍照室的照片',
      }
    ]
  },
  {
    id: 'bank_card',
    title: '去银行办卡',
    category: 'daily',
    icon: 'credit-card',
    encouragement: '银行里有保安和引导员，不懂直接问他们，很安全的。',
    steps: [
      {
        id: 'b1',
        action: '取号排队',
        description: '进门先找取号机，选择“个人业务”或“开卡”。',
        imagePlaceholder: '银行取号机的照片',
        flashCard: {
          title: '求助取号',
          content: '您好，我想办一张银行卡，请问怎么取号？'
        }
      },
      {
        id: 'b2',
        action: '填写申请表',
        description: '等待时可能需要填表，如果有不确定的地方空着别填，等会儿问柜员。',
        imagePlaceholder: '银行开户申请表的照片',
      },
      {
        id: 'b3',
        action: '柜台办理',
        description: '叫到号后去柜台，把身份证给柜员，按照提示输入密码、签字。',
        imagePlaceholder: '银行柜台办理业务的照片',
      }
    ]
  }
];
