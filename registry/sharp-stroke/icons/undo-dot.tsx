import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UndoDot({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21 18.9998L21 17.9998C21 13.9534 18.6274 10.283 14.9378 8.6216C11.2482 6.9602 6.9273 7.6166 3.8975 10.2987L3.3946 10.7439M2.9995 5.0308L3.1821 10.9969L8.1788 10.8147L9.1424 10.7796" fill="none"/>
      <path d="M12.7149 16.9998C12.7149 18.1044 11.8195 18.9998 10.7149 18.9998C9.6103 18.9998 8.7149 18.1044 8.7149 16.9998C8.7149 15.8952 9.6103 14.9998 10.7149 14.9998C11.8195 14.9998 12.7149 15.8952 12.7149 16.9998Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
