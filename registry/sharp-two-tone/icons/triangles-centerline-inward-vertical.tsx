import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineInwardVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M13 23H11V1H13V23ZM1.53 6.89C1.857 6.72 2.253 6.74 2.56 6.95L8.816 11.17C9.091 11.36 9.257 11.67 9.257 12C9.257 12.33 9.092 12.64 8.816 12.83L2.56 17.05C2.253 17.26 1.857 17.28 1.53 17.11C1.204 16.93 1 16.59 1 16.22V7.78C1 7.41 1.204 7.07 1.53 6.89ZM21.44 6.95C21.747 6.74 22.143 6.72 22.47 6.89C22.796 7.07 23 7.41 23 7.78V16.22C23 16.59 22.796 16.93 22.47 17.11C22.143 17.28 21.747 17.26 21.44 17.05L15.184 12.83C14.908 12.64 14.743 12.33 14.743 12C14.743 11.67 14.908 11.36 15.184 11.17L21.44 6.95Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1V23M8.257 12L2 16.22V7.78L8.257 12ZM15.743 12L22 16.22V7.78L15.743 12Z"/>
    </svg>
  )
}
