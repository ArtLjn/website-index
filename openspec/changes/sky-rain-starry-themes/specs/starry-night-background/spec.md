## ADDED Requirements

### Requirement: Starry night sky gradient
深色主题 SHALL显示深邃的夜空渐变背景，从顶部的深蓝过渡到深紫和黑色。

#### Scenario: Night sky gradient display in dark mode
- **WHEN** 用户启用深色模式
- **THEN** 背景显示多层夜空渐变，深蓝→深紫→黑色

#### Scenario: Subtle Milky Way effect
- **WHEN** 夜空背景渲染时
- **THEN** 包含微妙的银河星云光斑效果

---

### Requirement: Twinkling stars
深色主题 SHALL显示大量闪烁的星星，具有不同大小、亮度和闪烁频率。

#### Scenario: Multiple stars with variation
- **WHEN** 夜空背景渲染时
- **THEN** 显示50-100颗星星，大小、亮度、位置均随机分布

#### Scenario: Stars twinkle animation
- **WHEN** 页面显示时
- **THEN** 星星以不同频率闪烁，周期在1-5秒之间

#### Scenario: Star color temperature
- **WHEN** 星星渲染时
- **THEN** 星星具有不同的色温（暖白、冷白、淡蓝）

---

### Requirement: Moon glow effect
深色主题 SHALL在右上角显示淡淡的月光光晕。

#### Scenario: Moon position and glow
- **WHEN** 深色主题激活时
- **THEN** 右上角有柔和的月光径向渐变光晕

---

### Requirement: Shooting star easter egg
深色主题 SHALL有流星偶尔划过的惊喜彩蛋效果。

#### Scenario: Shooting star appears randomly
- **WHEN** 用户在深色主题下浏览时
- **THEN** 每30-60秒随机出现一颗流星划过屏幕

#### Scenario: Shooting star animation
- **WHEN** 流星出现时
- **THEN** 流星从右上向左下划过，带有闪烁的尾迹

---

### Requirement: Starry sky performance
深色主题的星空动画 SHALL使用高性能渲染方案。

#### Scenario: Canvas based rendering
- **WHEN** 星空动画运行时
- **THEN** 使用Canvas或优化的CSS动画确保流畅运行，不阻塞主线程
