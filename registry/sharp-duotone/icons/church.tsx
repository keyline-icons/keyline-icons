import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Church({ size = 24, ...props }: IconProps) {
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
      <path d="M13 1V3H15V5H13V7.11L18.59 11.19C18.847 11.38 19 11.68 19 12V13.38L22.447 15.11C22.786 15.27 23 15.62 23 16V22C23 22.55 22.552 23 22 23H2C1.448 23 1 22.55 1 22V16C1 15.62 1.214 15.27 1.553 15.11L5 13.38V12C5 11.68 5.153 11.38 5.41 11.19L11 7.11V5H9V3H11V1H13Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 16C13.105 16 14 16.9 14 18V21H10V18C10 16.9 10.895 16 12 16ZM13 1V3H15V5H13V7.61H11V5H9V3H11V1H13Z" fill="currentColor"/>
    </svg>
  )
}
