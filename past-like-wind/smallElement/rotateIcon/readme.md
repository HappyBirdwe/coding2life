1-首先定义四个元素，元素的中心为这四个元素组成的圆的圆心。这样定义的目的可以保证元素拼凑成一个正圆
2- 在单个元素的头尾各定义一个子元素，子元素旋转一定的角度，使其平行排列，中间刚好留一个正圆的位置。这里用了rotate和translate属性，不用skew属性，skew方法会使元素拉伸后变小。
3-将每个元素的子元素都定义不同的背景色，定义完成后，会形成8个不同的颜色排列，此时元素的形状已经产生了。需要注意的是，最后一个元素需要裁剪下，因为有可能会覆盖第一个元素。第4，8个子元素是分开写的。
4-此时在圆心位置定义一个圆，圆的大小刚好覆盖中间的空隙位置。外层容器也设为一个圆，大小为能全部显示所有的背景颜色，多余的部分截断隐藏
5-定义动画，并在外层容器上应用这个动画。这个动画的方式比较简单，就是旋转，直接使用rotate即可