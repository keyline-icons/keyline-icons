import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChefHat({ size = 24, ...props }: IconProps) {
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
      <path d="M12 18L6 18C5.4477 18 5 17.5523 5 17L5 12.7002C3.9788 12.3543 3.0839 11.7673 2.4002 11.0211C1.5427 10.0851 1 8.8763 1 7.5714C1 5.9781 1.6772 4.5565 2.7696 3.5422C3.8598 2.5299 5.3548 1.9286 7 1.9286C7.4978 1.9286 7.9487 1.9832 8.3842 2.0935C9.3538 1.3921 10.6185 1 12 1C13.3815 1 14.6462 1.3921 15.6158 2.0935C16.0513 1.9832 16.5022 1.9286 17 1.9286C18.6452 1.9286 20.1402 2.5299 21.2304 3.5422C22.3228 4.5565 23 5.9781 23 7.5714C23 8.8763 22.4573 10.0851 21.5998 11.0211C20.9161 11.7673 20.0212 12.3543 19 12.7002L19 17C19 17.5523 18.5523 18 18 18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 16L18 16C18.5523 16 19 16.4477 19 17L19 22C19 22.5523 18.5523 23 18 23L6 23C5.4477 23 5 22.5523 5 22L5 17C5 16.4477 5.4477 16 6 16Z" fill="currentColor"/>
    </svg>
  )
}
