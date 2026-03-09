/**
 * DailyActivities.tsx
 * Timeline list of daily activities (payments, sales, meetings).
 */

import React from 'react';
import { Card, Typography, Timeline } from 'antd';
import { dailyActivities } from '@/data/mockData';

const { Title, Text } = Typography;

const DailyActivities: React.FC = () => {
  return (
    <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 20 } }}>
      <Title level={5} style={{ margin: '0 0 16px', color: '#2a3547' }}>
        Daily activities
      </Title>

      <Timeline
        items={dailyActivities.map((activity) => ({
          key: activity.id,
          color: activity.color,
          children: (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              {/* Time */}
              <Text
                style={{
                  fontSize: 12,
                  color: '#7c8fac',
                  fontWeight: 600,
                  minWidth: 38,
                  flexShrink: 0,
                }}
              >
                {activity.time}
              </Text>

              {/* Activity text */}
              <Text
                style={{
                  fontSize: 13,
                  color: '#2a3547',
                  lineHeight: 1.5,
                }}
              >
                {activity.link ? (
                  <>
                    {activity.text.split('#')[0]}
                    <a
                      href="#"
                      style={{ color: '#5d87ff', fontWeight: 600 }}
                      onClick={(e) => e.preventDefault()}
                    >
                      #{activity.text.split('#')[1]}
                    </a>
                  </>
                ) : (
                  activity.text
                )}
              </Text>
            </div>
          ),
        }))}
      />
    </Card>
  );
};

export default DailyActivities;
