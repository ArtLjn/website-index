## ADDED Requirements

### Requirement: Sky gradient background
浅色主题 SHALL显示真实感的蓝天渐变背景，从顶部的深蓝过渡到地平线的浅蓝和暖橙色光晕。

#### Scenario: Sky gradient display in light mode
- **WHEN** 用户启用浅色模式
- **THEN** 背景显示多层蓝天渐变，包含左上角阳光光晕

#### Scenario: Sky gradient layers
- **WHEN** 天空背景渲染时
- **THEN** 至少包含三层梯度：深蓝天空、浅蓝中层、地平线暖色调

---

### Requirement: Floating white clouds
浅色主题 SHALL显示多朵飘动的白云，具有不同大小、位置、透明度和移动速度。

#### Scenario: Multiple clouds with variation
- **WHEN** 天空背景渲染时
- **THEN** 显示5-8朵白云，每朵大小、透明度、移动速度均不同

#### Scenario: Cloud animation
- **WHEN** 页面显示时
- **THEN** 云朵从左向右缓慢飘动，周期在20-40秒之间

#### Scenario: Cloud shape realism
- **WHEN** 云朵渲染时
- **THEN** 使用CSS伪元素构建蓬松的云朵形状，而非简单矩形

---

### Requirement: Rain drops animation
浅色主题 SHALL显示雨滴滑落动画，包含细雨丝和水滴在屏幕上滑落的效果。

#### Scenario: Rain drops falling
- **WHEN** 浅色主题激活时
- **THEN** 显示细雨丝从顶部下落的动画

#### Scenario: Water droplets sliding
- **WHEN** 用户向下滚动页面时
- **THEN** 显示水滴沿着屏幕滑落的轨迹，模拟玻璃打湿效果

#### Scenario: Rain performance
- **WHEN** 雨滴动画运行时
- **THEN** 使用Canvas或优化的CSS动画确保流畅运行，不阻塞主线程

---

### Requirement: Wet screen effect
浅色主题 SHALL有轻微的湿屏效果，增强沉浸感。

#### Scenario: Subtle glass blur
- **WHEN** 浅色主题激活时
- **THEN** 背景有轻微的模糊效果，模拟湿润玻璃

#### Scenario: Wetness on scroll
- **WHEN** 用户滚动页面时
- **THEN** 湿屏效果可轻微增强，创造互动感
