import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorWindow({ size = 24, ...props }: IconProps) {
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
      <path d="M9 20H6C4.3431 20 3 18.6569 3 17V6C3 4.3431 4.3431 3 6 3H17C18.6569 3 20 4.3431 20 6V9M7 7H9" strokeOpacity="0.4"/>
      <path d="M9.8773 11.7134C9.52211 10.5973 10.5424 9.5609 11.639 9.84133L11.7455 9.87258L20.9935 12.9536C22.2825 13.3841 22.3515 15.1843 21.0931 15.7066L17.3929 17.2407L15.5599 21.1538C14.9921 22.3641 13.2309 22.251 12.8246 20.9751L9.8773 11.7134Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
