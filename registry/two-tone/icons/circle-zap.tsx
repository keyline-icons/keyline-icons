import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleZap({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12ZM13.0077 7.3135C13.0092 7.302 13.0099 7.2903 13.0099 7.2787C13.0099 7.1253 12.8855 7.0009 12.7321 7.0009C12.6576 7.0009 12.5862 7.0309 12.5339 7.0841L7.0802 12.6387C7.0292 12.6907 7.0006 12.7605 7.0006 12.8333C7.0006 12.9867 7.125 13.1111 7.2784 13.1111L10.8142 13.1111C11.1211 13.1111 11.3698 13.3598 11.3698 13.6667C11.3698 13.69 11.3683 13.7133 11.3654 13.7364L10.9923 16.6865C10.9908 16.698 10.9901 16.7097 10.9901 16.7213C10.9901 16.8747 11.1145 16.9991 11.2679 16.9991C11.3424 16.9991 11.4138 16.9691 11.4661 16.9159L16.9198 11.3613C16.9708 11.3093 16.9994 11.2395 16.9994 11.1667C16.9994 11.0133 16.875 10.8889 16.7216 10.8889L13.1858 10.8889C12.8789 10.8889 12.6302 10.6402 12.6302 10.3333C12.6302 10.31 12.6317 10.2867 12.6346 10.2636L13.0077 7.3135Z" fill="none"/>
    </svg>
  )
}
