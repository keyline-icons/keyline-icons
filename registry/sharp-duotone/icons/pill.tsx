import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pill({ size = 24, ...props }: IconProps) {
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
      <path d="M12.2877 3.6664C13.3546 2.5994 14.8017 2 16.3106 2C19.4528 2 22 4.5472 22 7.6894C22 9.1983 21.4006 10.6454 20.3336 11.7123L11.7123 20.3336C10.6454 21.4006 9.1983 22 7.6894 22C4.5472 22 2 19.4528 2 16.3106C2 14.8017 2.5994 13.3546 3.6664 12.2877L12.2877 3.6664Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7.2699 8.6841L12.2877 3.6664C13.3546 2.5994 14.8017 2 16.3106 2C19.4528 2 22 4.5472 22 7.6894C22 9.1983 21.4006 10.6454 20.3336 11.7123L15.3159 16.7301L7.2699 8.6841Z" fill="currentColor"/>
    </svg>
  )
}
