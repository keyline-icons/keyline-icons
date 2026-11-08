import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronUpToLine({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.315 10.27C11.708 9.95 12.343 9.93 12.707 10.29L19 16.59L17.586 18L12 12.41L6.414 18L4.999 16.58L11.315 10.27ZM20 6V8H4V6H20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M11.312 10.27C11.704 9.96 12.344 9.93 12.708 10.29L19.001 16.59L17.587 18L12.001 12.41L6.415 18L5 16.58L11.312 10.27Z" fill="currentColor"/>
    </svg>
  )
}
