import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LampCeiling({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2H15M12 2V10M8 18C8 20.2091 9.791 22 12 22C14.209 22 16 20.2091 16 18"/>
      <path d="M12 19H5.503C4.508 19 3.707 18.4388 3.301 17.684C2.895 16.9292 2.868 15.9515 3.417 15.1216L6.869 9.8977C7.239 9.3359 7.867 9 8.538 9H15.462C16.133 9 16.761 9.3359 17.132 9.8989L20.583 15.1217C21.132 15.9515 21.105 16.9292 20.699 17.684C20.293 18.4388 19.492 19 18.498 19H12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
