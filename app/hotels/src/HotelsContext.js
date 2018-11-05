// @flow

import * as React from 'react';

import type { CurrentSearchStats } from './filter/CurrentSearchStatsType';

const defaultState = {
  version: '',
  cityId: null,
  checkin: null,
  checkout: null,
  roomsConfiguration: null,
  currency: '',
  cityName: null,
  latitude: null,
  longitude: null,
  currentSearchStats: {
    priceMax: 10000,
    priceMin: 0,
  },
  actions: {
    setCurrentSearchStats: () => {},
  },
  getGuestCount: () => 0,
};

const { Consumer, Provider: ContextProvider } = React.createContext({
  ...defaultState,
});

export type RoomConfigurationType = $ReadOnlyArray<{|
  +adultsCount: number,
  +children: $ReadOnlyArray<{|
    +age: number,
  |}>,
|}>;

type Props = {|
  +children: React.Node,
  +version: string,
  +cityName: ?string,
  +cityId: ?string,
  +checkin: ?string,
  +checkout: ?string,
  +roomsConfiguration: ?RoomConfigurationType,
  +currency: string,
  +latitude: ?number,
  +longitude: ?number,
|};

export type State = {|
  +version: string,
  +cityName: string | null,
  +cityId: string | null,
  +checkin: Date | null,
  +checkout: Date | null,
  +roomsConfiguration: RoomConfigurationType | null,
  +currency: string,
  currentSearchStats: CurrentSearchStats,
  +latitude: number | null,
  +longitude: number | null,
  +getGuestCount: () => number,
  +actions: {|
    +setCurrentSearchStats: ({|
      priceMax: number,
      priceMin: number,
    |}) => void,
  |},
|};

const validateDate = (input: string): boolean => {
  const reg = /^\d{4}-\d{2}-\d{2}$/;
  return reg.test(input);
};

export const getAsUtcDate = (input: ?string): Date | null => {
  if (input == null || !validateDate(input)) {
    return null;
  }
  const [year, month, date] = input.split('-').map(item => parseInt(item));
  return new Date(Date.UTC(year, month - 1, date));
};

class Provider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      version: props.version,
      cityId: props.cityId || null,
      checkin: getAsUtcDate(props.checkin),
      checkout: getAsUtcDate(props.checkout),
      roomsConfiguration: props.roomsConfiguration || null,
      currency: props.currency,
      cityName: props.cityName || null,
      latitude: props.latitude || null,
      longitude: props.longitude || null,
      currentSearchStats: {
        priceMax: 10000,
        priceMin: 0,
      },
      getGuestCount: this.getGuestCount,
      actions: {
        setCurrentSearchStats: this.setCurrentSearchStats,
      },
    };
  }

  setCurrentSearchStats = (currentSearchStats: CurrentSearchStats) => {
    this.setState({
      currentSearchStats,
    });
  };

  getGuestCount = () => {
    if (this.state.roomsConfiguration == null) {
      return 0;
    }
    return this.state.roomsConfiguration.reduce((sum, current) => {
      const adults = current.adultsCount;
      const children = current?.children?.length ?? 0;
      return sum + adults + children;
    }, 0);
  };

  render = () => (
    <ContextProvider value={this.state}>{this.props.children}</ContextProvider>
  );
}

export default { Consumer, Provider };

export function withHotelsContext(select: (state: State) => Object) {
  return function(Component: React.ElementType) {
    class WithHotelsContext extends React.Component<Object> {
      // $FlowExpectedError: We need to pass on the navigationOptions if any, flow does not know about it, but a react component might have it
      static navigationOptions = Component.navigationOptions;

      mapStateToProps = (state: State) => {
        const stateProps = select(state);
        return <Component {...this.props} {...stateProps} />;
      };

      render() {
        return <Consumer>{this.mapStateToProps}</Consumer>;
      }
    }

    return WithHotelsContext;
  };
}
