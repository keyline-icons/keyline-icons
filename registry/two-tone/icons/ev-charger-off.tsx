import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EvChargerOff({ size = 24, ...props }: IconProps) {
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
      <path d="M15 15L15 22C15 22.5523 14.5523 23 14 23L2 23C1.4477 23 1 22.5523 1 22L1 5C0.9986 3.9389 1.4202 2.9209 2.1716 2.1716L15 15ZM19 5L21 5L21 4C21 3.4477 21.4477 3 22 3C22.5523 3 23 3.4477 23 4L23 8.5C22.9999 9.688 22.164 10.712 21 10.95L21 14.3431C21 14.8954 20.5523 15.3431 20 15.3431C19.4477 15.3431 19 14.8954 19 14.3431L19 10.95C17.836 10.712 17.0001 9.688 17 8.5L17 4C17 3.4477 17.4477 3 18 3C18.5523 3 19 3.4477 19 4L19 5ZM7.6569 1L11 1C13.2092 1 15 2.7908 15 5L15 8.3431L14.98 8.3431C14.9802 8.8844 14.5415 9.3233 14.0002 9.3233C13.7402 9.3233 13.4908 9.22 13.3071 9.0361L13.2929 9.0503L6.9497 2.7071L6.9639 2.6929C6.78 2.5092 6.6767 2.2598 6.6767 1.9998C6.6767 1.4585 7.1156 1.0198 7.6569 1.02L7.6569 1Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M14 14L14 22L2 22L2 5C2 4.1715 2.3358 3.4215 2.8787 2.8787M14 22L22 22M14 17L17 17M8.5714 8.5714L6 12L10 12L7 16M2 2L22 22" fill="none"/>
    </svg>
  )
}
