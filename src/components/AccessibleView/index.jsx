import React from 'react';
import { View } from 'react-native';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const AccessibleView = ({ style, children, spacing = true, ...props }) => {
  const { increasedSpacing } = useAccessibility();

  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    const isLastChild = index === React.Children.count(children) - 1;

    return React.cloneElement(child, {
      style: [
        child.props.style,
        spacing && !isLastChild ? { marginBottom: increasedSpacing } : null,
      ],
    });
  });

  return (
    <View style={style} {...props}>
      {enhancedChildren}
    </View>
  );
};

export default AccessibleView;
