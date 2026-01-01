import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaults } from './types';
import SimplePanel from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'simpleText',
      name: 'Simple text option',
      description: 'Description of panel option',
      defaultValue: defaults.simpleText,
    })
    .addBooleanSwitch({
      path: 'showSeriesCounter',
      name: 'Show series counter',
      defaultValue: defaults.showSeriesCounter,
    })
    .addColorPicker({
      path: 'highlightColor',
      name: 'Highlight color',
      description: 'Circle & accent color of the panel',
      defaultValue: defaults.highlightColor,
    })
    .addBooleanSwitch({
      path: 'compactMode',
      name: 'Compact mode',
      description: 'Use smaller fonts and hide some details',
      defaultValue: defaults.compactMode,
    });
});
