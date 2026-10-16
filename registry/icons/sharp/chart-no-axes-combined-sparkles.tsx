import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartNoAxesCombinedSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M22.2781 1.7682L13 9.5L7.5 5.5L1.7071 11.2929M12 21L12 17M16 21L16 11.5M20 21L20 8"/>
      <path d="M5.5492 15.3739L6.4196 17.5804L8.6261 18.4508C8.8518 18.5397 9 18.7576 9 19C9 19.2424 8.8518 19.4603 8.6261 19.5492L6.4196 20.4196L5.5492 22.6261C5.4603 22.8518 5.2424 23 5 23C4.7576 23 4.5397 22.8518 4.4508 22.6261L3.5804 20.4196L1.3739 19.5492C1.1482 19.4603 1 19.2424 1 19C1 18.7576 1.1482 18.5397 1.3739 18.4508L3.5804 17.5804L4.4508 15.3739C4.5397 15.1482 4.7576 15 5 15C5.2424 15 5.4603 15.1482 5.5492 15.3739ZM9.8433 11.2337L10.3873 12.6127L11.7663 13.1567C11.9074 13.2123 12 13.3485 12 13.5C12 13.6515 11.9074 13.7877 11.7663 13.8433L10.3873 14.3873L9.8433 15.7663C9.7877 15.9074 9.6515 16 9.5 16C9.3485 16 9.2123 15.9074 9.1567 15.7663L8.6127 14.3873L7.2337 13.8433C7.0926 13.7877 7 13.6515 7 13.5C7 13.3485 7.0926 13.2123 7.2337 13.1567L8.6127 12.6127L9.1567 11.2337C9.2123 11.0926 9.3485 11 9.5 11C9.6515 11 9.7877 11.0926 9.8433 11.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
