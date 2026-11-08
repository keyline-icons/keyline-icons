import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpToLine({ size = 24, ...props }: IconProps) {
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
      <path d="M11 22V8.2004L5.7134 13.5788C5.3264 13.9728 4.6933 13.9788 4.2996 13.5918C3.9057 13.2049 3.9007 12.5709 4.2879 12.177L10.8741 5.4747C11.455 4.8837 12.449 4.9037 13.073 5.4207L19.712 12.177C20.0991 12.5709 20.0942 13.2049 19.7003 13.5918C19.3066 13.9788 18.6734 13.9728 18.2865 13.5788L12.9998 8.2004V22C12.9998 22.5529 12.5521 22.9999 11.9999 22.9999C11.4478 22.9999 11 22.5529 11 22Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18.9993 1.0011C19.5515 1.0011 19.9992 1.4491 19.9992 2.001C19.9992 2.553 19.5515 3.0009 18.9993 3.0009H5.0007C4.4485 3.0009 4.0008 2.553 4.0008 2.001C4.0008 1.4491 4.4485 1.0011 5.0007 1.0011H18.9993Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
