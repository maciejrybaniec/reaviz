import React, { Component, Fragment, createRef, ReactElement } from 'react';
import bind from 'memoize-bind';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ChartInternalDataTypes } from '../../common/data';
import { CloneElement } from '../../common/utils/children';
import { formatValue } from '../../common/utils/formatting';
import { Tooltip, TooltipProps } from '../../common/Tooltip';
import { SankeyLabel, SankeyLabelProps } from '../SankeyLabel';
import { Node, DEFAULT_COLOR } from '../utils';
import css from './SankeyNode.module.scss';

export interface SankeyNodeProps extends Node {
  active: boolean;
  animated: boolean;
  chartWidth?: number;
  className?: string;
  disabled: boolean;
  label: ReactElement<SankeyLabelProps, typeof SankeyLabel>;
  opacity: (active: boolean, disabled: boolean) => number;
  showLabel: boolean;
  style?: object;
  tooltip: ReactElement<TooltipProps, typeof Tooltip>;
  width?: number;
  onClick: (event: React.MouseEvent<SVGRectElement>) => void;
  onMouseEnter: (event: React.MouseEvent<SVGRectElement>) => void;
  onMouseLeave: (event: React.MouseEvent<SVGRectElement>) => void;
}

interface SankeyNodeState {
  hovered?: boolean;
}

export class SankeyNode extends Component<SankeyNodeProps, SankeyNodeState> {
  static defaultProps: Partial<SankeyNodeProps> = {
    active: false,
    animated: true,
    color: DEFAULT_COLOR,
    disabled: false,
    label: <SankeyLabel />,
    opacity: (active, disabled) => (active ? 1 : disabled ? 0.2 : 0.9),
    showLabel: true,
    tooltip: (
      <Tooltip
        followCursor={true}
        modifiers={{
          offset: {
            offset: '0, 5px'
          }
        }}
      />
    ),
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  state: SankeyNodeState = {};
  rect = createRef<SVGRectElement>();

  getNode() {
    const {
      id,
      title,
      color,
      sourceLinks,
      targetLinks,
      value,
      index,
      x0,
      x1,
      y0,
      y1
    } = this.props;

    return {
      id,
      title,
      color,
      sourceLinks,
      targetLinks,
      value,
      index,
      x0,
      x1,
      y0,
      y1
    };
  }

  onMouseEnter(event: React.MouseEvent<SVGRectElement>) {
    this.setState({ hovered: true });
    this.props.onMouseEnter(event);
  }

  onMouseLeave(event: React.MouseEvent<SVGRectElement>) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(event);
  }

  renderNode() {
    const {
      active,
      className,
      color,
      disabled,
      index,
      opacity,
      style,
      width,
      x0,
      x1,
      y0,
      y1,
      onClick
    } = this.props;
    const nodeWidth = width || (x1 && x0 && x1 - x0 > 0 ? x1 - x0 : 0);
    const nodeHeight = y1 && y0 && y1 - y0 > 0 ? y1 - y0 : 0;

    return (
      <g ref={this.rect}>
        <motion.rect
          key={`sankey-node-${x0}-${x1}-${y0}-${y1}-${index}`}
          className={classNames(css.node, className)}
          fillOpacity={opacity(active, disabled)}
          style={style}
          x={x0}
          y={y0}
          width={nodeWidth}
          height={nodeHeight}
          fill={color}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.1
          }}
          onClick={onClick}
          onMouseEnter={bind(this.onMouseEnter, this)}
          onMouseLeave={bind(this.onMouseLeave, this)}
        />
      </g>
    );
  }

  renderTooltipContent() {
    const { title, value } = this.props;

    return (
      <div className={css.tooltip}>
        <div className={css.tooltipLabel}>{title}</div>
        <div className={css.tooltipValue}>
          {formatValue(value as ChartInternalDataTypes)}
        </div>
      </div>
    );
  }

  render() {
    const { active, chartWidth, label, tooltip, showLabel } = this.props;

    return (
      <Fragment>
        {this.renderNode()}
        {showLabel && (
          <CloneElement<SankeyLabelProps>
            active={active}
            element={label}
            chartWidth={chartWidth}
            node={this.getNode()}
          />
        )}
        {!tooltip.props.disabled && (
          <CloneElement<TooltipProps>
            content={this.renderTooltipContent.bind(this)}
            element={tooltip}
            visible={this.state.hovered}
            reference={this.rect}
          />
        )}
      </Fragment>
    );
  }
}
