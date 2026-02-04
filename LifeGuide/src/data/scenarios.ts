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
    id: 'hospital_reg_cn',
    title: '医院挂号 (手机预约)',
    category: 'medical',
    icon: 'stethoscope',
    encouragement: '不用起大早排队，用手机就能挂上号。到了医院如果不舒服，随时找志愿者帮忙。',
    steps: [
      {
        id: 'h1',
        action: '手机预约挂号',
        description: '打开微信搜索“健康之路”、“微医”或医院名字，进入小程序。点击“预约挂号”，选择科室（如头疼选神经内科，感冒选呼吸科）和时间。',
        imagePlaceholder: '手机挂号界面截图，圈出“预约挂号”按钮',
        flashCard: {
          title: '求助挂号',
          content: '你好，我不会用手机挂号，能帮我操作一下吗？我想挂[某某科]。'
        }
      },
      {
        id: 'h2',
        action: '自助机取号/报到',
        description: '按预约时间提前30分钟到医院。找到自助机，点击“取号”或“报到”，扫描手机上的二维码或刷身份证。打印出纸质挂号单。',
        imagePlaceholder: '医院自助机照片，显示“取号”界面',
        flashCard: {
          title: '询问自助机',
          content: '你好，请问自助取号机在哪里？我预约了今天的号。'
        }
      },
      {
        id: 'h3',
        action: '候诊与就医',
        description: '看挂号单上的“诊区”和“诊室”号码，去门口椅子上坐着等。屏幕叫到你名字时，进去找医生。',
        imagePlaceholder: '诊室门口的叫号屏幕',
      },
      {
        id: 'h4',
        action: '缴费取药',
        description: '医生开完单子后，直接在自助机或手机上缴费（不用去窗口排队）。然后去药房窗口，看屏幕提示取药。',
        imagePlaceholder: '药房取药窗口',
      }
    ]
  },
  {
    id: 'transport_cn',
    title: '地铁/公交 (手机乘车码)',
    category: 'transport',
    icon: 'train',
    encouragement: '一部手机就能走遍全城，不需要找零钱买票啦！',
    steps: [
      {
        id: 't1',
        action: '打开乘车码',
        description: '打开支付宝点击“出行”，或微信“我”-“服务”-“交通出行”。选择“地铁”或“公交”，屏幕会显示一个二维码。',
        imagePlaceholder: '支付宝/微信乘车码界面',
        flashCard: {
          title: '求助开通',
          content: '你好，我找不到乘车码在哪里打开，能教我一下吗？'
        }
      },
      {
        id: 't2',
        action: '对准闸机扫描',
        description: '进站时，把手机二维码对准闸机上的黄色扫描口（通常有光）。听到“嘀”声或闸门打开，就赶紧通过。',
        imagePlaceholder: '闸机扫码口，手机对准扫描',
      },
      {
        id: 't3',
        action: '出站再次扫码',
        description: '到达目的地出站时，同样操作：打开乘车码，对准闸机扫描口扫一下，门开后出站。费用会自动扣除。',
        imagePlaceholder: '出站闸机',
      }
    ]
  },
  {
    id: 'id_card_cn',
    title: '身份证办理/换领',
    category: 'docs',
    icon: 'id-card',
    encouragement: '身份证是你的重要证件，派出所的警察叔叔阿姨会帮你办好的。',
    steps: [
      {
        id: 'm1',
        action: '准备材料',
        description: '带上旧身份证（如果换领）或户口本（如果首领/丢失）。建议穿深色有领子的衣服，不要戴首饰和美瞳。',
        imagePlaceholder: '户口本和深色上衣',
      },
      {
        id: 'm2',
        action: '前往派出所/政务大厅',
        description: '去户籍地或居住地附近的派出所户籍科（或政务服务中心）。进门先在取号机拿号。',
        imagePlaceholder: '派出所户籍室标识',
        flashCard: {
          title: '询问取号',
          content: '你好，我要办身份证，请问在哪里取号？'
        }
      },
      {
        id: 'm3',
        action: '拍照和录指纹',
        description: '轮到你时，先去照相室拍照（听指挥，坐端正）。然后去柜台录入指纹（通常是大拇指）。',
        imagePlaceholder: '指纹采集仪',
      },
      {
        id: 'm4',
        action: '选择领取方式',
        description: '你可以选择“邮寄到家”（需要付快递费）或者“过几天自己来拿”。办完后会给你一张回执单，收好它。',
        imagePlaceholder: '身份证领取回执单',
      }
    ]
  },
  {
    id: 'social_help_cn',
    title: '社恐/紧急求助',
    category: 'daily',
    icon: 'heart-handshake',
    encouragement: '遇到困难不要怕，社会上好人很多，政府热线也很管用。',
    steps: [
      {
        id: 's1',
        action: '拨打 12345',
        description: '如果遇到不懂的政务问题、投诉或者需要帮助，直接打 12345 市民热线。这是政府的“总客服”。',
        imagePlaceholder: '手机拨号界面显示 12345',
        flashCard: {
          title: '热线求助',
          content: '你好，我是老人/学生，遇到个困难不知道找谁，能帮帮我吗？'
        }
      },
      {
        id: 's2',
        action: '寻找志愿者/警察',
        description: '在地铁站、医院、大厅，找穿红马甲的志愿者或穿制服的警察。他们最值得信任。',
        imagePlaceholder: '红马甲志愿者照片',
        flashCard: {
          title: '当面求助',
          content: '不好意思打扰一下，我迷路了/我不懂这个怎么弄，能帮我吗？'
        }
      }
    ]
  }
];
