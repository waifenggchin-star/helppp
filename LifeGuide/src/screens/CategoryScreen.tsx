import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';

// 暴力写入数据：直接硬编码在这里，不再引用外部文件
const HARDCODED_SCENARIOS = [
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
        id: 'i1',
        action: '准备材料',
        description: '如果是换领（过期了），带上旧身份证就行。如果是丢了补办，带上户口本（如果能找到）。最好穿深色衣服，不戴首饰，不戴美瞳。',
        imagePlaceholder: '户口本和旧身份证',
      },
      {
        id: 'i2',
        action: '去派出所/办证中心',
        description: '去离你最近的派出所户籍科或政务服务中心。进门先在取号机取号（点击“身份证办理”）。',
        imagePlaceholder: '派出所户籍大厅',
        flashCard: {
          title: '求助取号',
          content: '你好，我要办身份证，请问在哪里取号？'
        }
      },
      {
        id: 'i3',
        action: '拍照与录指纹',
        description: '叫到号后，先去照相室拍照（听工作人员指挥）。然后去窗口录入指纹，签字确认。',
        imagePlaceholder: '照相室和指纹采集仪',
      },
      {
        id: 'i4',
        action: '领取',
        description: '办好后会给你一张回执单。可以选择邮寄到家（要付快递费），或者过段时间自己来拿。',
        imagePlaceholder: '身份证领取回执单',
      }
    ]
  },
  {
    id: 'hotline_cn',
    title: '12345 市民热线',
    category: 'daily',
    icon: 'phone',
    encouragement: '遇到解决不了的困难，或者想投诉建议，就打这个电话，政府会帮忙。',
    steps: [
      {
        id: 'l1',
        action: '拨打电话',
        description: '在手机拨号键盘输入 12345，点击拨打。',
        imagePlaceholder: '手机拨号界面显示12345',
      },
      {
        id: 'l2',
        action: '说明问题',
        description: '电话接通后，会有语音提示，通常按“1”接入人工服务。跟接线员说清楚你遇到了什么麻烦，或者在哪个地方看到了什么问题。',
        imagePlaceholder: '接线员通话中',
        flashCard: {
          title: '求助接线员',
          content: '你好，我是老人，我遇到个难事，不知道该找谁，能帮帮我吗？'
        }
      }
    ]
  }
];

export const CategoryScreen = ({ route, navigation }: any) => {
  const { categoryId, categoryName } = route.params;
  const { colors, typography, spacing } = useTheme();

  // Filter from HARDCODED_SCENARIOS
  const filteredScenarios = HARDCODED_SCENARIOS.filter(s => s.category === categoryId);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { 
          backgroundColor: colors.card,
          padding: spacing.padding,
          borderRadius: spacing.borderRadius,
          borderColor: colors.border,
        }
      ]}
      onPress={() => navigation.navigate('ScenarioDetail', { scenarioId: item.id })}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text, fontSize: typography.stepTitleSize }]}>
          {item.title}
        </Text>
        <Text style={[styles.cardDesc, { color: colors.subText, fontSize: typography.baseSize * 0.8 }]} numberOfLines={2}>
          {item.encouragement}
        </Text>
      </View>
      <ChevronRight color={colors.subText} size={24} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: typography.titleSize }]}>
          {categoryName}
        </Text>
      </View>

      <FlatList
        data={filteredScenarios}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.padding, gap: spacing.gap }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.subText, fontSize: typography.baseSize }}>
              暂无相关指南
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    lineHeight: 20,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
