import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartColumnSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M8 12L8 7M13 18L13 10M18 18L18 12"/>
      <path d="M17.5492 2.3739L18.4196 4.5804L20.6261 5.4508C20.8518 5.5397 21 5.7576 21 6C21 6.2424 20.8518 6.4603 20.6261 6.5492L18.4196 7.4196L17.5492 9.6261C17.4603 9.8518 17.2424 10 17 10C16.7576 10 16.5397 9.8518 16.4508 9.6261L15.5804 7.4196L13.3739 6.5492C13.1482 6.4603 13 6.2424 13 6C13 5.7576 13.1482 5.5397 13.3739 5.4508L15.5804 4.5804L16.4508 2.3739C16.5397 2.1482 16.7576 2 17 2C17.2424 2 17.4603 2.1482 17.5492 2.3739Z" fill="currentColor" stroke="none"/>
      <path d="M8.2746 14.1869L8.7098 15.2902L9.8131 15.7254C9.9259 15.7698 10 15.8788 10 16C10 16.1212 9.9259 16.2302 9.8131 16.2746L8.7098 16.7098L8.2746 17.8131C8.2302 17.9259 8.1212 18 8 18C7.8788 18 7.7698 17.9259 7.7254 17.8131L7.2902 16.7098L6.1869 16.2746C6.0741 16.2302 6 16.1212 6 16C6 15.8788 6.0741 15.7698 6.1869 15.7254L7.2902 15.2902L7.7254 14.1869C7.7698 14.0741 7.8788 14 8 14C8.1212 14 8.2302 14.0741 8.2746 14.1869Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
