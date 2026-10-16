import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EraserSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M14.929 4L22 11.071L11.0711 22L7.071 22L2 16.929L14.929 4ZM8 10.9289L15.0711 18M9.071 22L23 22"/>
      <path d="M5.5492 1.3739L6.4196 3.5804L8.6261 4.4508C8.8518 4.5397 9 4.7576 9 5C9 5.2424 8.8518 5.4603 8.6261 5.5492L6.4196 6.4196L5.5492 8.6261C5.4603 8.8518 5.2424 9 5 9C4.7576 9 4.5397 8.8518 4.4508 8.6261L3.5804 6.4196L1.3739 5.5492C1.1482 5.4603 1 5.2424 1 5C1 4.7576 1.1482 4.5397 1.3739 4.4508L3.5804 3.5804L4.4508 1.3739C4.5397 1.1482 4.7576 1 5 1C5.2424 1 5.4603 1.1482 5.5492 1.3739Z" fill="currentColor" stroke="none"/>
      <path d="M15.2746 9.1869L15.7098 10.2902L16.8131 10.7254C16.9259 10.7698 17 10.8788 17 11C17 11.1212 16.9259 11.2302 16.8131 11.2746L15.7098 11.7098L15.2746 12.8131C15.2302 12.9259 15.1212 13 15 13C14.8788 13 14.7698 12.9259 14.7254 12.8131L14.2902 11.7098L13.1869 11.2746C13.0741 11.2302 13 11.1212 13 11C13 10.8788 13.0741 10.7698 13.1869 10.7254L14.2902 10.2902L14.7254 9.1869C14.7698 9.0741 14.8788 9 15 9C15.1212 9 15.2302 9.0741 15.2746 9.1869Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
