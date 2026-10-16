import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartLineIncreasingSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L3 21L22 21" strokeOpacity="0.4"/>
      <path d="M17.6182 9.586L17.3188 10C15.3614 12.7069 11.9477 15.6811 7 16"/>
      <path d="M10.5492 3.3739L11.4196 5.5804L13.6261 6.4508C13.8518 6.5397 14 6.7576 14 7C14 7.2424 13.8518 7.4603 13.6261 7.5492L11.4196 8.4196L10.5492 10.6261C10.4603 10.8518 10.2424 11 10 11C9.7576 11 9.5397 10.8518 9.4508 10.6261L8.5804 8.4196L6.3739 7.5492C6.1482 7.4603 6 7.2424 6 7C6 6.7576 6.1482 6.5397 6.3739 6.4508L8.5804 5.5804L9.4508 3.3739C9.5397 3.1482 9.7576 3 10 3C10.2424 3 10.4603 3.1482 10.5492 3.3739Z" fill="currentColor" stroke="none"/>
      <path d="M17.8433 2.2337L18.3873 3.6127L19.7663 4.1567C19.9074 4.2123 20 4.3485 20 4.5C20 4.6515 19.9074 4.7877 19.7663 4.8433L18.3873 5.3873L17.8433 6.7663C17.7877 6.9074 17.6515 7 17.5 7C17.3485 7 17.2123 6.9074 17.1567 6.7663L16.6127 5.3873L15.2337 4.8433C15.0926 4.7877 15 4.6515 15 4.5C15 4.3485 15.0926 4.2123 15.2337 4.1567L16.6127 3.6127L17.1567 2.2337C17.2123 2.0926 17.3485 2 17.5 2C17.6515 2 17.7877 2.0926 17.8433 2.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
