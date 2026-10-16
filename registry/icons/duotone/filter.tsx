import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Filter({ size = 24, ...props }: IconProps) {
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
      <path d="M3.2903 4.7025C2.6666 4.0707 3.1142 3 4.002 3L19.998 3C20.8858 3 21.3334 4.0707 20.7097 4.7025L14.2883 11.2079C14.1036 11.3951 14 11.6474 14 11.9104L14 18.4997C14 18.8146 13.8516 19.1112 13.5996 19.3L11.5996 20.7985C10.9403 21.2925 10 20.822 10 19.9982L10 11.9104C10 11.6474 9.8964 11.3951 9.7117 11.2079L3.2903 4.7025C2.6666 4.0707 3.1142 3 4.002 3Z" fill="none"/>
    </svg>
  )
}
